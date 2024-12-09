"use client"
import React, { useState } from 'react'
import LoginPage from './LoginPage'
import logo from "@/public/madara.jpeg"
import Image from 'next/image'
import { auth,db} from '../Firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, collection,addDoc } from "firebase/firestore"; 
import { useRouter } from 'next/navigation'

//Main Function
function SignupPage() {

    const [login,setLogin] = useState(false)

    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirm,setConfirm] = useState("")
    const router = useRouter()

        // From Adding/Submission
  const handleSubmitSignUp = async (event) => {
    event.preventDefault()
    if (password != confirm){
        alert("Passwords Do not match")
        return
    }

    try{
        const docRef = await addDoc(collection(db, "Users"), {
          Username:name,
          Email:email
        });
      }
      catch(e){
        alert(e)
      }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      router.push("/home")
      alert("Succeesfully Signed up");
      console.log("User Created");
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    })
  };

  return (
       
<div className='flex flex-col items-center justify-center min-h-screen px-6 mx-auto'>

    <div className="flex items-center min-w-[500px] justify-center mt-6">
        {
            login ?    <button onClick={()=>{
                setLogin(true)
            }} className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-gray-300">
                sign in
            </button> : 
               <button onClick={()=>{
                setLogin(true)
            }} className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                sign in
            </button>
        }
        {
            login ? <button onClick={()=>{
                setLogin(false)
            }} className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-white">
                sign up
            </button> :
            <button onClick={()=>{
                setLogin(false)
            }} className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                sign up
            </button>
        }

        
    </div>
{
    login ? 
    <div className="container flex items-center justify-center w-full  max-w-md">   
    <LoginPage/>
    </div>
    :
    <div className="container flex flex-col items-center justify-center">  
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <Image className="mx-auto mt-5 h-32 w-auto" src={logo} alt="Madara Uchiha"/>
    </div>   
        <form onSubmit={handleSubmitSignUp} className="w-full max-w-md">
            <div className="relative flex items-center mt-5">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round'  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} type="text" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
            </div>
            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} type="email" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input  value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" className="block w-full px-10 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap='round' strokeLinejoin='round'  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input  value={confirm} onChange={(e)=>{
                    setConfirm(e.target.value)
                }} type="password" className="block w-full px-10 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div>
            <div className="mt-6">
                <button type='submit' className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
    }
</div>
  )
}

export default SignupPage