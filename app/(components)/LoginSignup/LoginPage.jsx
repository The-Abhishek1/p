"use client"
import React,{useState} from 'react'
import logo from "@/public/madara.jpeg"
import Image from 'next/image'
import { auth} from '../Firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'


function LoginPage() {

  const [login,setLogin] = useState(false)
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const router = useRouter()

      // From Adding/Submission
const handleSubmitSignUp = async (event) => {
  event.preventDefault()

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    router.push("/home")
    alert("Succeesfully Signed In");
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  })
};

  return (
    <div className="flex container min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Image className="mx-auto h-32 w-auto" src={logo} alt="Madara Uchiha"/>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmitSignUp} className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div className="mt-2">
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input onChange={(e)=>{
              setPassword(e.target.value)
            }} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div className='flex gap-3 ml-1'>
        <input type="checkbox" name="rememberme" id="" required/>
        <p className="text-center text-sm/6 text-gray-500">
        Remember me </p>
      </div>
  
        <div>
          <button type='submit' className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Sign In
          </button>
        </div>
       
      </form>
    </div>
  </div>
  )
}

export default LoginPage