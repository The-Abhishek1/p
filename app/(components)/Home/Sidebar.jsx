"use client"
import logo from "@/public/madara.jpeg"
import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import Passwordgen from "./Passwordgen"
import Passwords from "./Passwords"
import { auth,db } from "../Firebase/firebase"
import { useRouter } from "next/navigation"
import { doc, collection,addDoc,getDocs } from "firebase/firestore"; 

//Main Function
function Sidebar() {

    const[sideBar,setSideBar] = useState(true)

    const router = useRouter()


    //Function to sigout

    const Signout = () =>{
      auth.signOut()
      alert("Signed out from the app")
      router.push('/')
    }

    const [users,setUsers] =useState([])

    useEffect(() => {
      // Collection Reference
     const userCollectionRef = collection(db, "Users");
     const getUsers = async () => {
       const data = await getDocs(userCollectionRef);
       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     };
     getUsers();
   },[]);

   const scrollToPasswords = () => {
      window.scrollTo({
        top:0,
        behavior:'smooth',
      })
    }
    
    const scrollToPasswordgen1 = () => {
      window.scrollTo({
        top:700,
        behavior:'smooth',
      })
    }
    const scrollToPasswordgen2 = () => {
      window.scrollTo({
        top:700,
        behavior:'smooth',
      })
    }
   



  return (
    <div>
        
        {
            sideBar ?
      
<button onClick={()=>{
    setSideBar(false)
}}  type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>:null
  }

<aside id="default-sidebar" className="fixed border-2 border-gray-200 border-dashed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full flex flex-col items-center px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <div className="flex flex-col items-center justify-center gap-3">
    <Image className="mx-auto mt-5 h-[80px] w-[80px] rounded-full" src={logo} alt="Madara Uchiha"/>
        {
         users.filter(user=> user.Email == auth.currentUser.email).map((user)=>{
            return(
<h3 key={user.id} className="font-bold text-[26px] text-red-600 mt-4">{user.Username}</h3>
            )
         })
        }
        
    </div>

      <ul className="space-y-2 font-medium flex flex-col gap-3 items-start mt-10">
         <li onClick={scrollToPasswords} className="w-full">
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap='round' strokeLinejoin='round'  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Passwords</span>
            </a>
         </li>
         <li onClick={scrollToPasswordgen1}  className="w-full">
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Password generator</span>
            </a>
         </li>
         <li onClick={Signout} className="w-full">
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
         </li>
      </ul>
   </div>
</aside>
{
    sideBar ? null:
<aside id="default-sidebar" className="fixed border-r-2 border-dashed top-0  sm:hidden left-0 z-40 w-60 h-screen transition-transform" aria-label="Sidebar">
<button onClick={()=>{
setSideBar(true)
}}
type="button" className="inline-flex items-center top-3 p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden absolute right-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
<span className="sr-only">Open sidebar</span>
<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd"   fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
</svg>
</button>
<div className="h-full flex mt-10 flex-col items-center px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
<div className="flex items-center justify-center gap-3">
<Image className="mx-auto mt-5 h-16 rounded-full w-16" src={logo} alt="Madara Uchiha"/>
    <h3 className="font-bold text-[20px] text-red-600 mt-4">Idiot</h3>
</div>

  <ul className="space-y-2 font-medium flex flex-col gap-3 items-start mt-14">
     <li onClick={scrollToPasswords}  className="w-full">
        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap='round' strokeLinejoin='round'  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
           <span className="flex-1 ms-3 whitespace-nowrap">Passwords</span>
        </a>
     </li>
     <li onClick={scrollToPasswordgen1}  className="w-full">
        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
           </svg>
           <span className="flex-1 ms-3 whitespace-nowrap">Password generator</span>
        </a>
     </li>
     <li onClick={Signout} className="w-full">
        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
           </svg>
           <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
        </a>
     </li>
  </ul>
</div>
</aside>
}
<div className="mt-10">
   <Passwords/>
</div>
<div className="mt-10">
   <Passwordgen/>
</div>
</div>
  )
}

export default Sidebar