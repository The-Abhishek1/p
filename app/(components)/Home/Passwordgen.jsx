"use client"
import React, { useState } from 'react'
import { MdOutlineReplayCircleFilled } from "react-icons/md";

function Passwordgen() {

  const [length,setLength] = useState(0)

    function generateCustomPassword(length) {
        const getRandomChar = () => {
            const charSets = [
                [48, 57],  // Numbers (0-9)
                [65, 90],  // Uppercase letters (A-Z)
                [97, 122], // Lowercase letters (a-z)
                [33, 47],  // Special characters (!"#$%&'()*+,-./)
                [91, 96],  // Special characters ([\]^_`)
                
            ];
            
            // Select a random character set
            const charSet = charSets[Math.floor(Math.random() * charSets.length)];
            // Generate a random character code from the selected set
            const charCode = Math.floor(Math.random() * 
            (charSet[1] - charSet[0] + 1)) + charSet[0];
            // Convert the character code to a character
            return String.fromCharCode(charCode);
        };
    
        var password = '';
        for (let i = 0; i < length; i++) {
            password += getRandomChar();
        }
        setSuccess(true)
        setPassword(password)
        return password;
        
    }

    const[success,setSuccess] = useState(false)
    const[password,setPassword] = useState("")

  return (
    <div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="flex flex-col items-center gap-10">
         <h1 className="text-center font-bold">Password Generator</h1>
         {success ? 
         <div className="flex items-center gap-3">
         <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Your Password is:</label>
         <div className="mt-2">
           <input type="text" disabled value={password} name="password" id="length" required className="block text-center w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
         </div>
         <MdOutlineReplayCircleFilled onClick={()=>{
            generateCustomPassword(15)
         }} className='cursor-pointer mt-2' size={20} color='blue' />
       </div>:
         <form className="space-y-3" action="#" method="POST">
        <div className="flex items-center gap-3">
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Password Length:</label>
          <div className="mt-2">
            <input onChange={(e)=>{
              setLength(e.target.value)
            }} type="number" min={10} name="length" id="length" required className="block w-full rounded-md bg-white px-3 py-[2px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"/>
          </div>
        </div>
        <div>
          <button onClick={()=>{
            if(length == 0){
              alert("Please enter the length idiot")
            }
            else{
              generateCustomPassword(length)
            }  
          }} className="w-full px-6 mt-4 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Generate the Password
          </button>
        </div>
      </form>
      }     <button onClick={()=>{
        setSuccess(false)
      }} className='bg-blue-600 absolute right-10 text-white py-1 px-2 hover:bg-blue-400 text-[13px] rounded-sm'>New</button>
      </div>
   </div>
</div>
  )
}

export default Passwordgen