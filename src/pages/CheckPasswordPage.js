




import React, { useEffect, useState } from 'react'

// import { IoCloseSharp } from "react-icons/io5";
// import { PiUserCircleFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';



const CheckPasswordPage = () => {
  const [data,setData] = useState({


  
    password : "",
   
})


const navigate = useNavigate()
const location = useLocation()
const dispatch = useDispatch()

console.log("location",location.state)

useEffect(()=>{
    if(!location?.state?.name){
        navigate('/email')
    }

},[])


const handleOnChange = (e)=>{
    const { name , value} = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })

}







const handleSubmit = async(e)=>{
e.preventDefault()
e.stopPropagation()

// const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`



try{
const response = await axios({
    method : 'post',
    url :  URL,
    data : {
        userId : location?.state?._id,
        password : data.password
    },
    withCredentials : true
})

toast.success(response.data.message)

// if(response.data.success){
//   dispatch(setToken(response?.data?.token))
//   localStorage.setItem('token',response?.data?.token)
// }

if(response.data.success) {
  dispatch(setToken(response?.data?.token))
  localStorage.setItem('token',response?.data?.token)
setData({

  password : "",
 
})

}
navigate('/')
}
catch(error){  
toast.error(error?.response?.data?.message)



}

}
  return (
    <div className='mt-5'>
  <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'> 
    <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'> 
        {/* <PiUserCircleFill  size={70}/> */}
        <Avatar width={70}
        height={70}
        name={location?.state?.name}
        imageUrl={location?.state?.profile_pic}/>


        <h2 className='font-semibold text-lg'> {location?.state?.name}</h2>
        </div>
        

 
    <h3> Welcome to Whatsapp</h3>

    <form className='grid gap-2 mt-5' onSubmit={handleSubmit}>




<div className='flex flex-col gap-1'>
<label htmlFor="password">password:</label>
<input type="password" name="password" id="password" placeholder='enter your email'
 className='bg-slate-100 px-3 py-2 focus:outline-primary' 
  value={data.password} onChange={handleOnChange} required/>


</div>






<button className='bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'> Login</button>
 <p className='my-3 text-center'> New User ? <Link to={"/forgot-password"} className ="hover:text-primary hover:underline font-semibold">  Forget Password</Link></p>

    </form>
  </div>
    </div>
  )
}

export default CheckPasswordPage






















































































































































// import React, { useEffect, useState } from 'react'

// // import { IoCloseSharp } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { FaUserTie } from "react-icons/fa";
// import Avatar from '../components/Avatar';

// const CheckPasswordPage = () => {

//   const [data, setData] = useState({

//     password: "",

//   })

//   const navigate = useNavigate()

//   const location = useLocation()
//   console.log("location", location.state)




//   // useEffect(()=>{
//   // if(!location?.state?.name){
//   //   navigate('/email') 
//   // }

//   // },[])


//   useEffect(() => {
//     if (!location?.state?.name) {
//       navigate('/email') // Redirect if there's no name in the location state
//     }

//   }, [location?.state?.name, navigate]) // Add dependencies to ensure proper reactivity


//   const handleOnChange = (e) => {
//     const { name, value } = e.target

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     })

//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`
//     // const URL = `${process.env.REACT_APP_BACKEND_URL}api/password`
//     // const URL = `${process.env.REACT_APP_BACKEND_URL}api/password`;

//     const payload = {
//       url : URL,
//       data : {
//         userId : location?.state?._id,
//         password : data.password
//       },

//     }
//     try {
//       const response = await axios.post(URL,{

      
//       url : URL,
//       data : {
//         userId : location?.state?._id,
//         password : data.password
//       },
//       withCredentials : true
//     })

//       toast.success(response.data.message)

//       if (response.data.success) {
//         setData({

//           password: "",


//         })

//       }
//       navigate('/')

//     }
//     catch (error) {
//       toast.error(error?.response?.data?.message)
//       console.log("error", error)

//     }

//   }
//   return (
//     <div className='mt-4'>
//       <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
//         <div className='w-fit mx-auto mb-2 justify-center items-center flex-col'>
//           <Avatar width={70}
//             height={70}
//             name={location?.state?.name}
//             imageUrl={location?.state?.profile_pic}

//           />
//           <h2>{location?.state?.name}</h2>

//         </div>
//         {/* <h3> Welcome to Whatsapp</h3> */}

//         <form className='grid gap-2 mt-5' onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-1'>
//             <label htmlFor="password">Password:</label>
//             <input type="Password" name="password" id="password" placeholder='enter your Password'
//               className="bg-slate-100 px-3 py-2 focus:outline-primary"
//               value={data.password} onChange={handleOnChange} required />
//           </div>
//           <button className='bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'> Login</button>
//           <p className='my-3 text-center'> <Link to={"/forgot-password"} className="hover:text-primary hover:underline font-semibold">Forget Password ?</Link></p>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default CheckPasswordPage

// import React, { useEffect, useState } from 'react'

// // import { IoCloseSharp } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { FaUserTie } from "react-icons/fa";
// import Avatar from '../components/Avatar';
// // import { useDispatch } from 'react-redux';
// // import { setUser } from '../redux/userSlice';

// const CheckPasswordPage = () => {

//   const [data, setData] = useState({

//     password: "",

//   })

//   const navigate = useNavigate()

//   const location = useLocation()

//   console.log("location", location.state)
//   // const dispatch = useDispatch()

//   useEffect(() => {
//     if (!location?.state?.name) {
//       navigate('/email') // Redirect if there's no name in the location state
//     }

//   }, [location?.state?.name, navigate]) // Add dependencies to ensure proper reactivity


//   const handleOnChange = (e) => {
//     const { name, value } = e.target

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     })

//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
  
//     // Ensure userId is available from location.state
//     const userId = location?.state?._id;
  
//     if (!userId) {
//       toast.error("User ID is missing");
//       return;
//     }
  
//     // Create data with userId included
//     const dataWithUserId = { ...data, userId }; // Append the userId to the data object
  
//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
  
//     try {
//       const response = await axios.post(URL, dataWithUserId); // Send dataWithUserId instead of just data
  
//       toast.success(response.data.message);
       



//       /// abhi kra 

//       if(response.data.success){
//         // dispatch(setUser(response.data.data))
//         console.log("data",response)
//       }
  
//       if (response.data.success) {
//         setData({
//           password: "",
//         });
//       }
//       navigate('/');
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       console.log("error", error);
//     }
//   };
//   return (
//     <div className='mt-4'>
//       <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
//         <div className='w-fit mx-auto mb-2 justify-center items-center flex-col'>
//           <Avatar width={70}
//             height={70}
//             name={location?.state?.name}
//             imageUrl={location?.state?.profile_pic}

//           />
//           <h2>{location?.state?.name}</h2>

//         </div>
//         {/* <h3> Welcome to Whatsapp</h3> */}

//         <form className='grid gap-2 mt-5' onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-1'>
//             <label htmlFor="password">Password:</label>
//             <input type="Password" name="password" id="password" placeholder='enter your Password'
//               className="bg-slate-100 px-3 py-2 focus:outline-primary"
//               value={data.password} onChange={handleOnChange} required />
//           </div>
//           <button className='bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'> Login</button>
//           <p className='my-3 text-center'> <Link to={"/forgot-password"} className="hover:text-primary hover:underline font-semibold">Forget Password ?</Link></p>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default CheckPasswordPage




// import React, { useEffect, useState } from 'react'

// // import { IoCloseSharp } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { FaUserTie } from "react-icons/fa";
// import Avatar from '../components/Avatar';
// // import { useDispatch } from 'react-redux';
// // import { setUser } from '../redux/userSlice';

// const CheckPasswordPage = () => {

//   const [data, setData] = useState({

//     password: "",

//   })

//   const navigate = useNavigate()

//   const location = useLocation()

//   console.log("location", location.state)
//   // const dispatch = useDispatch()

//   useEffect(() => {
//     if (!location?.state?.name) {
//       navigate('/email') // Redirect if there's no name in the location state
//     }

//   }, [location?.state?.name, navigate]) // Add dependencies to ensure proper reactivity


//   const handleOnChange = (e) => {
//     const { name, value } = e.target

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     })

//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
  
//     // Ensure userId is available from location.state
//     const userId = location?.state?._id;
  
//     if (!userId) {
//       toast.error("User ID is missing");
//       return;
//     }
  
//     // Create data with userId included
//     //-------------------------------------------------------
//     // const dataWithUserId = { ...data, userId };-------------------------------//
//      // Append the userId to the data object
  
//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

//     //-------------//


//     try {
//       const response = await axios.post({
//         method : 'post',
//         url : URL,
//         data : {
//           userId : location?.state?._id,
//           password : data.password


//       },
//       withCredentials : true
//     }


//         ); 
  
//       toast.success(response.data.message);
       

  
//     // try {
//     //   const response = await axios.post(URL, dataWithUserId); 
  
//     //   toast.success(response.data.message);
       



//       /// abhi kra 

//       if(response.data.success){
//         // dispatch(setUser(response.data.data))
//         console.log("data",response)
//       }
  
//       if (response.data.success) {
//         setData({
//           password: "",
//         });
//       }
//       navigate('/');
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       console.log("error", error);
//     }
//   };
//   return (
//     <div className='mt-4'>
//       <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
//         <div className='w-fit mx-auto mb-2 justify-center items-center flex-col'>
//           <Avatar width={70}
//             height={70}
//             name={location?.state?.name}
//             imageUrl={location?.state?.profile_pic}

//           />
//           <h2>{location?.state?.name}</h2>

//         </div>
//         {/* <h3> Welcome to Whatsapp</h3> */}

//         <form className='grid gap-2 mt-5' onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-1'>
//             <label htmlFor="password">Password:</label>
//             <input type="Password" name="password" id="password" placeholder='enter your Password'
//               className="bg-slate-100 px-3 py-2 focus:outline-primary"
//               value={data.password} onChange={handleOnChange} required />
//           </div>
//           <button className='bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'> Login</button>
//           <p className='my-3 text-center'> <Link to={"/forgot-password"} className="hover:text-primary hover:underline font-semibold">Forget Password ?</Link></p>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default CheckPasswordPage








// import React, { useEffect, useState } from 'react'
// // import { IoClose } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { PiUserCircle } from "react-icons/pi";
// import Avatar from '../components/Avatar';
// import { useDispatch } from 'react-redux';
// import { setToken} from '../redux/userSlice';

// const CheckPasswordPage = () => {
//   const [data,setData] = useState({
//     password : "",
//     userId : ""
//   })
//   const navigate = useNavigate()
//   const location = useLocation()
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     if(!location?.state?.name){
//       navigate('/email')
//     }
//   },[])

//   const handleOnChange = (e)=>{
//     const { name, value} = e.target

//     setData((preve)=>{
//       return{
//           ...preve,
//           [name] : value
//       }
//     })
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     e.stopPropagation()

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

//     try {
//         const response = await axios({
//           method :'post',
//           url : URL,
//           data : {
//             userId : location?.state?._id,
//             password : data.password
//           },
//           withCredentials : true
//         })

//         toast.success(response.data.message)

//         if(response.data.success){
//             dispatch(setToken(response?.data?.token))
//             localStorage.setItem('token',response?.data?.token)

//             setData({
//               password : "",
//             })
//             navigate('/')
//         }
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
//   }


//   return (
//     <div className='mt-5'>
//         <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

//             <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
//                 {/* <PiUserCircle
//                   size={80}
//                 /> */}
//                 <Avatar
//                   width={70}
//                   height={70}
//                   name={location?.state?.name}
//                   imageUrl={location?.state?.profile_pic}
//                 />
//                 <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
//             </div>

//           <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

//           <div className='flex flex-col gap-1'>
//                 <label htmlFor='password'>Password :</label>
//                 <input
//                   type='password'
//                   id='password'
//                   name='password'
//                   placeholder='enter your password' 
//                   className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                   value={data.password}
//                   onChange={handleOnChange}
//                   required
//                 />
//               </div>

//               <button
//                className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
//               >
//                 Login
//               </button>

//           </form>

//           <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
//         </div>
//     </div>
//   )
// }

// export default CheckPasswordPage







// import React, { useEffect, useState } from 'react'
// import { IoClose } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// import { PiUserCircle } from "react-icons/pi";
// import Avatar from '../components/Avatar';
// import { useDispatch } from 'react-redux';
// import { setToken, setUser } from '../redux/userSlice';

// const CheckPasswordPage = () => {
//   const [data,setData] = useState({
//     password : "",
//     userId : ""
//   })
//   const navigate = useNavigate()
//   const location = useLocation()
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     if(!location?.state?.name){
//       navigate('/email')
//     }
//   },[])

//   const handleOnChange = (e)=>{
//     const { name, value} = e.target

//     setData((preve)=>{
//       return{
//           ...preve,
//           [name] : value
//       }
//     })
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     e.stopPropagation()

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

//     try {
//         const response = await axios({
//           method :'post',
//           url : URL,
//           data : {
//             userId : location?.state?._id,
//             password : data.password
//           },
//           withCredentials : true
//         })

//         toast.success(response.data.message)

//         if(response.data.success){
//             dispatch(setToken(response?.data?.token))
//             localStorage.setItem('token',response?.data?.token)

//             setData({
//               password : "",
//             })
//             navigate('/')
//         }
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
//   }


//   return (
//     <div className='mt-5'>
//         <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

//             <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
//                 {/* <PiUserCircle
//                   size={80}
//                 /> */}
//                 <Avatar
//                   width={70}
//                   height={70}
//                   name={location?.state?.name}
//                   imageUrl={location?.state?.profile_pic}
//                 />
//                 <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
//             </div>

//           <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

//           <div className='flex flex-col gap-1'>
//                 <label htmlFor='password'>Password :</label>
//                 <input
//                   type='password'
//                   id='password'
//                   name='password'
//                   placeholder='enter your password' 
//                   className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                   value={data.password}
//                   onChange={handleOnChange}
//                   required
//                 />
//               </div>

//               <button
//                className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
//               >
//                 Login
//               </button>

//           </form>

//           <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
//         </div>
//     </div>
//   )
// }

// export default CheckPasswordPage






// import React, { useEffect, useState } from 'react'
// // import { IoClose } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import uploadFile from '../helpers/uploadFile';
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { PiUserCircle } from "react-icons/pi";
// import Avatar from '../components/Avatar';
// import { useDispatch } from 'react-redux';
// import { setToken} from '../redux/userSlice';

// const CheckPasswordPage = () => {
//   const [data,setData] = useState({
//     password : "",
//     userId : ""
//   })
//   const navigate = useNavigate()
//   const location = useLocation()
//   const dispatch = useDispatch()

//   // useEffect(()=>{
//   //   if(!location?.state?.name){
//   //     navigate('/email')
//   //   }
//   // },[])

//   useEffect(() => {
//     if (!location?.state?.name) {
//       navigate('/email');
//     }
//   }, [location?.state?.name, navigate]);
  

//   const handleOnChange = (e)=>{
//     const { name, value} = e.target

//     setData((preve)=>{
//       return{
//           ...preve,
//           [name] : value
//       }
//     })
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     e.stopPropagation()

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

//     try {
//         const response = await axios({
//           method :'post',
//           url : URL,
//           data : {
//             userId : location?.state?._id,
//             password : data.password
//           },
//           withCredentials : true
//         })

//         toast.success(response.data.message)

//         if(response.data.success){
//             dispatch(setToken(response?.data?.token))
//             localStorage.setItem('token',response?.data?.token)

//             setData({
//               password : "",
//             })
//             navigate('/')
//         }
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
//   }


//   return (
//     <div className='mt-5'>
//         <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

//             <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
//                 {/* <PiUserCircle
//                   size={80}
//                 /> */}
//                 <Avatar
//                   width={70}
//                   height={70}
//                   name={location?.state?.name}
//                   imageUrl={location?.state?.profile_pic}
//                 />
//                 <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
//             </div>

//           <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

//           <div className='flex flex-col gap-1'>
//                 <label htmlFor='password'>Password :</label>
//                 <input
//                   type='password'
//                   id='password'
//                   name='password'
//                   placeholder='enter your password' 
//                   className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                   value={data.password}
//                   onChange={handleOnChange}
//                   required
//                 />
//               </div>

//               <button
//                className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
//               >
//                 Login
//               </button>

//           </form>

//           <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
//         </div>
//     </div>
//   )
// }

// export default CheckPasswordPage

