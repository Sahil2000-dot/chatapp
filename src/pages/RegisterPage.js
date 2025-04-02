import React, { useState } from 'react'

import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';



const RegisterPage = () => {

    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        profile_pic : ""
    })

    const[uploadPhoto,setuploadPhoto] = useState("")
    const navigate = useNavigate()
   

    const handleOnChange = (e)=>{
        const { name , value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    }


    const handleuploadPhoto = async(e)=>{
const file = e.target.files[0]

const uploadPhoto = await uploadFile(file)
// console.log("uploadphoto",uploadPhoto)


setuploadPhoto(file)
setData((preve)=>{
  return{
    ...preve,
    profile_pic : uploadPhoto?.url 
  }
})

    }



   const  handleClearUploadPhoto =(e)=>{
    e.stopPropagation()
    e.preventDefault()
    setuploadPhoto(null)
   }




    const handleSubmit = async(e)=>{
e.preventDefault()
e.stopPropagation()

// const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
try{
  const response = await axios.post(URL,data)
  console.log("response",response)
  toast.success(response.data.message)

   if(response.data.success) {
    setData({
      name : "",
      email : "",
      password:"",
      profile_pic:""
  })

}
navigate('/email')
}
catch(error){  
  toast.error(error?.response?.data?.message)
  // console.log("error",error)
  

}
console.log('data',data)
    }


  return (
    <div className='mt-5'>
  <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'> 
    <h3> Welcome to Whatsapp</h3>

    <form className='grid gap-2 mt-5' onSubmit={handleSubmit}>
<div className='flex flex-col gap-1'>
<label htmlFor="name">Name:</label>
<input type="text" name="name" id="name" placeholder='enter your name'
 className='bg-slate-100 px-3 py-2 focus:outline-primary' 
  value={data.name} onChange={handleOnChange} required/>


</div>



<div className='flex flex-col gap-1'>
<label htmlFor="email">Email:</label>
<input type="email" name="email" id="email" placeholder='enter your email'
 className='bg-slate-100 px-3 py-2 focus:outline-primary' 
  value={data.email} onChange={handleOnChange} required/>


</div>

<div className='flex flex-col gap-1'>
<label htmlFor="password">Password:</label>
<input type="password" name="password" id="password" placeholder='enter your password'
 className='bg-slate-100 px-3 py-2 focus:outline-primary' 
  value={data.password} onChange={handleOnChange} required/>


</div>


<div className='flex flex-col gap-1'>
<label htmlFor="profile_pic">Photo:

<div className='h-14 bg-slate-200 flex justify-center items-center border rounded  hover:border-primary cursor-pointer'>
    <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'> 
        {
            uploadPhoto?.name ? uploadPhoto?.name : "upload pro photo"
        }
       
        </p>
        {
            uploadPhoto?.name&&(
                <button  className='text-lg ml-3 hover:text-red-800' onClick={handleClearUploadPhoto}><IoCloseSharp /></button>

            )
        }
       

</div>
</label>
<input type="file" name="profile_pic" id="profile_pic" 
 className='bg-slate-100 px-3 py-2 focus:outline-primary hidden' 
 onChange={handleuploadPhoto} 
 />


</div>

<button className='bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'> Register</button>
 <p className='my-3 text-center'> Already HAve an account ? <Link to={"/email"} className ="hover:text-primary hover:underline font-semibold">  Login </Link></p>

    </form>
  </div>
    </div>
  )
}

export default RegisterPage
