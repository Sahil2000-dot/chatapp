// import React,{useEffect, useRef, useState} from 'react'
// import Avatar from './Avatar'
// import uploadFile from '../helpers/uploadFile'
// import Divider from './Divider'

// const EditUserDetail = ({onClose,user}) => {
//   const [data,setData] = useState({
//     name : user?.user,
//     profile_pic : user?.profile_pic
//   })

//   // const uploadPhotoRef = useRef()
//   const uploadPhotoRef = useRef()

// useEffect(()=>{
//   setData((preve)=>{
//     return{
//       ...preve,
//       ...user
//     }
//   })
// },[user])

//   // console.log('user edit ',user)

//   const handleOnChange =(e)=>{
//     const { name, value } = e.target
//     setData((preve)=>{
//       return {
//         ...preve,
//         [name] : value
//       }
//     })

//   }

//   // const handleOpenUploadPhoto = ()=>{
//   //   uploadPhotoRef.current.click()
//   // }

//   const handleOpenUploadPhoto = ()=>{
//     uploadPhotoRef.current.click()

//   }
//   const handleUploadPhoto = async(e)=>{
//     const file = e.target.files[0]

// const uploadPhoto = await uploadFile(file)
// // console.log("uploadphoto",uploadPhoto)


// setData((preve)=>{
//   return{
//     ...preve,
//     profile_pic : uploadPhoto?.url 
//   }
// })

//   }

//   const handleSubmit = async (e)=>{
//     e.preventDefault()
//     e.stopPropagation()
//   }
//   return (
//     <div className='fixed top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
//      <div className='bg-white p-5  py-6 m-2 rounded w-full max-w-sm'>  
//       <h2 className='font-semibold'> Profile Detail</h2>
//       <p className='text-sm '>  Edit user Detail</p>

//        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
//          <div className='flex flex-col gap-1'>
//           <label htmlFor="name">Name:</label>
//           <input type="text" name="name" id="name" value={data.name} onChange={handleOnChange} 
//           className='w-full py-2 px-2 focus:outline-primary border-0.5' />
//          </div>
      

   

//     <div>
// <div>Photo:</div>
// <div className='my-4 flex items-center gap-4'>
//   <Avatar width={40} height={40} imageUrl={data?.profile_pic} name={data?.name}/>

//   <label htmlFor="profile_pic">
 
//   <button className='font-semibold' onClick={handleOpenUploadPhoto}>change Photo</button>

//   <input type="file"
//    id="profile_pic" className='hidden' onchange={handleUploadPhoto} ref={uploadPhotoRef}/>
//   </label>
// </div>

// </div>
// <Divider/>
// <div className='flex gap-2 w-fit ml-auto'>
//   <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'> Cancel</button>
//   <button onSubmit={handleSubmit}className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary '> save</button>
// </div>

// </form>
//     </div>
//     </div>
//   )
// }

// export default React.memo(EditUserDetail)



import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import {setUser} from '../redux/userSlice'

const EditUserDetail = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.user,
    profile_pic: user?.profile_pic,
  })

  const uploadPhotoRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user,
      }
    })
  }, [user])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault()
    e.stopPropagation()
    uploadPhotoRef.current.click()
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Ensure the file is successfully uploaded
    const uploadPhoto = await uploadFile(file)
    console.log("Upload Photo:", uploadPhoto)

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      }
    })
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()

//     try{
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api//update-user`
// const response =  await axios({
//   method : "post",
//   url: URL,
//   data : data,
//   withCredential : true
// })
// console.log('response',response)
//  toast.success(response?.data?.message)

//  if(response.data.success){
//   dispatch(setUser(response.data.data))

//  }
//     } catch(error){
//       // toast.error(error?.response?.data.message)
//       console.log(error)
//       toast.error()

//     }
//     // Add your submit logic here (e.g., save the changes)
//   }



const handleSubmit = async (e) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`
    const response = await axios({
      method: "post",
      url: URL,
      data: data,
      withCredentials: true,
    })

    console.log("response", response)

    // Ensure the response has the necessary data structure before dispatching
    if (response?.data?.success && response?.data?.data) {
      toast.success(response?.data?.message)

      // Dispatch setUser only if the data is valid
      dispatch(setUser(response.data.data))

      onClose()
    } else {
      toast.error("Failed to update user details. Please try again.")
    }
  } catch (error) {
    console.log(error)
    toast.error("An error occurred while updating user details.")
  }
}


// const handleSubmit = async (e) => {
//   e.preventDefault()
//   e.stopPropagation()

//   try {
//     const formData = new FormData()
//     formData.append('name', data.name)
//     formData.append('profile_pic', data.profile_pic) // Assuming the profile picture URL is set properly

//     // If you are uploading the file directly (instead of just a URL):
//     // formData.append('file', e.target.files[0]) // Uncomment if the file is directly uploaded

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`
    
//     const response = await axios.post(URL, formData, {
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'multipart/form-data', // Ensure the form data is sent correctly
//       }
//     })

//     console.log("response", response)

//     // Ensure the response has the necessary data structure before dispatching
//     if (response?.data?.success && response?.data?.data) {
//       toast.success(response?.data?.message)

//       // Dispatch setUser only if the data is valid
//       dispatch(setUser(response.data.data))

//       onClose()
//     } else {
//       toast.error("Failed to update user details. Please try again.")
//     }
//   } catch (error) {
//     console.log(error)
//     toast.error("An error occurred while updating user details.")
//   }
// }

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-5 py-6 m-2 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Detail</h2>
        <p className="text-sm">Edit user Detail</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-2 px-2 focus:outline-primary border-0.5"
            />
          </div>

          <div>
            <div>Photo:</div>
            <div className="my-4 flex items-center gap-4">
              <Avatar width={40} height={40} imageUrl={data?.profile_pic} name={data?.name} />
              <label htmlFor="profile_pic">
                <button className="font-semibold" onClick={handleOpenUploadPhoto}>
                  Change Photo
                </button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto} // Fixed here: onChange instead of onchange
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />

          <div className="flex gap-2 w-fit ml-auto">
            <button onClick={onClose} className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white">
              Cancel
            </button>
            <button type="submit" className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetail)
