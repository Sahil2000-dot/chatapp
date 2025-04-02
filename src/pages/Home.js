







import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { logout, setOnlineUser,setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/whatsapp.png'

import io from 'socket.io-client'

 
 const Home = () =>{
  const user = useSelector(state => state.user)
  const dispatch=useDispatch()
const navigate = useNavigate()
const location = useLocation()

console.log('user',user)

  // console.log("redux user",user)


  // const fetchUserDetails = async()=>{
  //       try{
  //         const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
  //         const response = await axios({     
  //           url : URL,
  //           withCredentials : true,
       
  //         })
  //         console.log("current user details",response)   
    
  //       } catch(error){
  //         console.log("error",error)   
    
  //       }
  //     }



  const fetchUserDetails = async () => {
    try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

        // Assuming you need to send an authorization token (replace 'your_token' with the actual token)
        const response = await axios({
            url: URL,
            // method: 'GET',
            // headers: {
            //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`  // Or whatever the API requires
            // },
            withCredentials: true, // Optional, depending on your backend setup
        });

        dispatch(setUser(response.data.data))

        
        if(response.data.data.logout){
          dispatch(logout())
          navigate('/email')

        }

        console.log("current user details", response);

    } catch (error) {
        console.log("error", error);
    }
};


      useEffect(()=>{
        fetchUserDetails()
      },[])
     
//soket connection //

useEffect(()=>{
  const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
    auth : {
      token : localStorage.getItem('token')    }
  })

  socketConnection.on('onlineUser',(data)=>{
    console.log(data)
    dispatch(setOnlineUser(data))
  })

  dispatch(setSocketConnection(socketConnection))

  return ()=>{
    socketConnection.disconnect( )
  }


},[])







// console.log("location", location)
const basePath = location.pathname === '/'



 



  return (  

    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
       <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
       <Sidebar/>
       </section>
  



     <section className={`${basePath && "hidden"}`}>  <Outlet/>
     </section>

     <div className={`justify-center items-center flex-col gap-3 hidden ${!basePath ?  "hidden" : "lg-flex"}`}>
      <div >
        <img src ={logo}
      width ={200}
      alt ='logo'/>

      </div>
      <p className='text-lg mt-2 text-slate-500'>select user to send message</p>
     </div>



     </div>
     


   

  )
}

export default Home




