"use client"
import React, { useState,useEffect } from 'react'
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { db,auth } from '../Firebase/firebase'
import { doc, collection,addDoc,getDocs,setDoc,deleteDoc } from "firebase/firestore"; 

//Main function
function Passwords() {

    //hook for enabling/disabling form
    const[form,setForm] = useState(true)

    //Use Inputs
    const [domain,setDomain] = useState("")
    const [user,setUser] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Useremail = auth.currentUser.email

    //Adding New Password
    const handleSubmit = async (event) => {
      event.preventDefault()
      try{

        const docRef = await addDoc(collection(db, `${Useremail}`), {
          Domain:domain,
          User:user,
          Email:email,
          Password:password
        });
      alert("Document is inserted")
      setForm(false)
      setRefresh(!refresh)

      }catch(e) {
       const errorMessage = e.errorMessage
       alert(e)
      }
    }
        //Retrieving Data
        const[passwords,setPasswords] = useState([])
        const[refresh,setRefresh] = useState(false)

        //State to Display First Password Details
        const[first,setFirst] = useState("")

        //UseEffect to retrieve data
        useEffect(() => {
           // Collection Reference
          const passwordCollectionRef = collection(db, `${Useremail}`);
          const getPasswords = async () => {
            const data = await getDocs(passwordCollectionRef);
            setPasswords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(passwords);
          };
          getPasswords();
        },[refresh]);


        //State-Hook for Displaying corresponding Password Details
        const [current,setCurrent] = useState("Instagram")

        //State for Updating the Current Data
        const[update,setUpdate] = useState(false)
        const[updateData,setUpdateData] = useState("")

        const updateHandle = async (event) => {
          event.preventDefault()
         
         try{
          await setDoc(doc(db,`${Useremail}`,updateData),{
            Domain:domain,
            User:user,
            Email:email,
            Password:password
          },{merge:true})
          alert("Document is updated")
          setUpdate(false)
          setRefresh(!refresh)
      }  
         catch(e){
          alert(e)
         } 
        }

        //Delete Document from the Database

        const [deletedata,setDeletedata] =  useState("")
        const Deletehandle = async() => {
          try{
            await deleteDoc(doc(db,`${Useremail}`,deletedata))
            alert("Document is Deleted")
            setRefresh(!refresh)
          }catch(e){
            alert(e)
          }

        }
  return (
    <div className="p-4 px-2 sm:ml-64 relative flex items-center flex-col">
      <div className='flex top-6 z-10 absolute items-center justify-center'>
                {
                  update ?  <form action="" onSubmit={updateHandle} className='flex flex-col border-2  items-center justify-center bg-slate-50 p-5'>
                  <h1 className='font-semibold my-4'>Update Password</h1>
              <div className="flex self-end items-center gap-3">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Domain:</label>
                <div className="mt-2">
                  <input onChange={(e)=>{
                    setDomain(e.target.value)
                  }} type="text" name="domain" id="domain" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
                </div>
              </div>
              <div className="flex self-end items-center gap-3">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Username:</label>
                <div className="mt-2">
                  <input  onChange={(e)=>{
                    setUser(e.target.value)
                  }} type="text" name="name" id="name" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
                </div>
              </div>
              <div className="flex self-end items-center gap-3">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email:</label>
                <div className="mt-2">
                  <input onChange={(e)=>{
                    setEmail(e.target.value)
                  }} type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
                </div>
              </div>
              <div className="flex self-end items-center gap-3">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password:</label>
                <div className="mt-2">
                  <input onChange={(e)=>{
                    setPassword(e.target.value)
                  }} type="password"  min={6} name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
                </div>
              </div>
              <div className='flex text-[13px] gap-4 items-center justify-center mt-10'>
                          <button  onClick={()=>{
                            setUpdate(false)
                          }} className='bg-red-600 text-white px-4 py-1 rounded-sm hover:bg-red-400'>Cancel</button>
                          <button type='submit' className='bg-green-600 text-white px-4 py-1 rounded-sm hover:bg-green-400'>Update</button>
                      </div>
          </form> : null
                }
                </div>
    <div className="p-4  justify-center relative px-2 flex flex-col items-center border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <h1 className="text-center font-bold">Stored Passwords</h1>
    <button onClick={()=>{
           setRefresh(!refresh)
         }} className='cursor-pointer hover:bg-blue-300 absolute right-10 flex items-center gap-2 bg-blue-500 text-white p-2 py-1 rounded-sm text-[13px] top-2 mt-2'>Refresh
    <MdOutlineReplayCircleFilled   size={15} />
         </button>

       <div className='mt-10  mxl:flex-col flex justify-between items-center relative gap-20 px-5'>
        <div className='flex  scr gap-10 border-2 border-dashed p-4'>
                <ul className="list-none py-2 max-h-[250px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-red-500 overflow-y-auto pr-6 border-r-2 border-dashed flex flex-col gap-3 text-[13px] font-semibold">
                   {
                    passwords.map((pass)=>{
                      return(
                       <div key={pass.id}>
                      <li  onClick={()=>{
                        setCurrent(pass.Domain)
                      }} className='bg-slate-100  border-[1px] p-2 cursor-pointer'>{pass.Domain}</li>
                      </div>)                      
                    })
                   }
                   
                </ul>

                {
                  passwords.filter(pass => pass.Domain == current).map((pass)=>{
                    return(
                      <div key={pass.id} className='flex justify-center flex-col p-4 gap-2 text-[13px]'>
                      <div className='flex flex-row gap-2'>
                          <p className='font-semibold'>Domain:</p>
                          <p>{pass.Domain}</p>
                      </div>
                      <div className='flex flex-row gap-2'>
                          <p className='font-semibold'>User:</p>
                          <p>{pass.User}</p>
                      </div>
                      <div className='flex flex-row gap-2'>
                          <p className='font-semibold'>Email:</p>
                          <p>{pass.Email}</p>
                          </div>
                      <div className='flex flex-row gap-2'>
                          <p className='font-semibold'>Password:</p>
                          <p>{pass.Password}</p>
                      </div>
                      <div className='flex gap-4 items-center justify-center mt-10'>
                          <button onClick={()=>{
                            setDeletedata(pass.id)
                            Deletehandle()
                          }} className='bg-red-600 text-white px-4 py-1 rounded-sm hover:bg-red-400'>Delete</button>
                          <button onClick={()=>{
                            setUpdate(!update)
                            setUpdateData(pass.id)
                          }} className='bg-green-600 text-white px-4 py-1 rounded-sm hover:bg-green-400'>Update</button>
                      </div>
                   </div>
                   
                    )
                  })
                }
 
                </div>
           
        {
          form ? 
        <form action="" onSubmit={handleSubmit} className='flex flex-col border-2  items-center justify-center bg-slate-50 p-5'>
            <h1 className='font-semibold my-4'>Add New Password</h1>
        <div className="flex self-end items-center gap-3">
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Domain:</label>
          <div className="mt-2">
            <input onChange={(e)=>{
              setDomain(e.target.value)
            }} type="text" name="domain" id="domain" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div className="flex self-end items-center gap-3">
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Username:</label>
          <div className="mt-2">
            <input  onChange={(e)=>{
              setUser(e.target.value)
            }} type="text" name="name" id="name" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div className="flex self-end items-center gap-3">
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email:</label>
          <div className="mt-2">
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }} type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div className="flex self-end items-center gap-3">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password:</label>
          <div className="mt-2">
            <input onChange={(e)=>{
              setPassword(e.target.value)
            }} type="password" min={6} name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div className='flex items-center justify-center mt-6'>
        <button type='submit' className='bg-blue-600 text-white py-1 px-2 hover:bg-blue-400 text-[13px] rounded-sm'>Submit</button>
        </div>
    </form> :

    <div className='border-2 flex flex-col items-center justify-center gap-6 bg-slate-50 p-5 px-32'>
      <h1 className='font-bold text-green-500 text-center text-[25px]'>Success</h1>
      <button onClick={()=>{
        setForm(true)
      }
      } className='bg-blue-600 text-white py-1 px-2 hover:bg-blue-400 text-[13px] rounded-sm'>Add New</button>
    </div>
        }
    </div>
    </div>
    </div>
  )
}

export default Passwords