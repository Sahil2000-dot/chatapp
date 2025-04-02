import React,{useEffect, useState} from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetail from './EditUserDetail';

import { FaImage } from "react-icons/fa";
// import Divider from './Divider';

import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from './SearchUser';
import { FaVideo } from "react-icons/fa";
import { logout } from '../redux/userSlice';


const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen]=useState(false)
    const [allUser,setAllUser] = useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)
 const socketConnection = useSelector(state => state?.user?.socketConnection)

 const dispatch = useDispatch()
 const navigate = useNavigate()

// useEffect(()=>{
//     if(socketConnection){
//         socketConnection.emit('sidebar',user._id)
//         socketConnection.on('conversation',(data)=>{
//             console.log('conversation',data)

//             const conversationUserData  = data.map((conversationUser,index)=>{
//                 if(conversationUser?.sender?._id === conversationUser?.reciever?._id){
//                     return{
//                         ...conversationUser,
//                         userDetails : conversationUser?.sender
//                     }
//                 }

//                 else if(conversationUser?.reciever?._id !== user?._id){
//                     return{
//                         ...conversationUser,
//                         userDetails : conversationUser.reciever
//                     }

//                 }else{
//                     return{
//                         ...conversationUser,
//                         userDetails : conversationUser.sender
//                     }

//                 }
             
//             })
//             setAllUser(conversationUserData)
//         })
        
//     }

// },[socketConnection,user])



useEffect(()=>{
    if(socketConnection){
        socketConnection.emit('sidebar',user._id)
        
        socketConnection.on('conversation',(data)=>{
            // console.log('conversation',data)
            
            const conversationUserData = data.map((conversationUser,index)=>{
                if(conversationUser?.sender?._id === conversationUser?.reciever?._id){
                    return{
                        ...conversationUser,
                        userDetails : conversationUser?.sender
                    }
                }
                else if(conversationUser?.reciever?._id !== user?._id){
                    return{
                        ...conversationUser,
                        userDetails : conversationUser.reciever
                    }
                }else{
                    return{
                        ...conversationUser,
                        userDetails : conversationUser.sender
                    }
                }
            })

            setAllUser(conversationUserData)
        })
    }
},[socketConnection,user])
        // console.log(user)

        const handleLogout=()=>{
         dispatch(logout())
         navigate("/email")
         localStorage.clear()
        }
    
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>


        
<div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-900 flex flex-col justify-between'>
    <div>
        <NavLink className={({isActive})=>`w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-300 ${isActive && "bg-slate-300"}`} title='chat'>
    <IoChatbubbleEllipses size={25}/> 
    </NavLink>


    <div title='add friend' onClick={()=>setOpenSearchUser(true)} className='w-12 h-10 flex justify-center items-center cursor-pointer my-2  hover:bg-slate-300' >
        <FaUserPlus size={25}/></div> </div>

 <div className='flex flex-col items-center'>
    <button className='mx-auto' title={user?.name}onClick={()=>setEditUserOpen(true)}> 
        <Avatar width={30}
        height={30}
        name={user?.name}
        imageUrl={user?.profile_pic}
        userId={user?._id}/>
        </button>


  <button title='logout' className='w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-300' onClick={handleLogout}>
  <span className='-ml-1'><BiLogOut size={25}/> </span>
  </button>

</div></div>
<div className='w-full'>
<div className='h-14 flex items-center'>
<h2 className='text-2xl font-bold p-4 text-slate-800'>Message</h2>
</div>
<div className='bg-slate-200 p-[0.5px]'>
    
</div>
<div className=' h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto scrollbar'>
{
    allUser.length === 0 &&(
        <div className='mt-12'>
            <div className=' flex justify-center items-center my-4 text-slate-500'>
            <GoArrowUpLeft size={50}  />
            </div>
            <p className='text-lg text-center text-slate-400'>
                Explore user to start a conversation  with 
            </p>
        </div>
    )
}


{/* {

    allUser.map((conv,index)=>{
        return(
            <div key={conv?._id}>
                <div> <Avatar
                  imageUrl={conv?.userDetails?.profile_pic}
                name={conv?.userDetails?.name}
                width={50} height={50}/></div>



            </div>
    )
    })
} */}







{
                        allUser.map((conv,index)=>{
                            return(
                                <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                                    <div>
                                        <Avatar
                                            imageUrl={conv?.userDetails?.profile_pic}
                                            name={conv?.userDetails?.name}
                                            width={40}
                                            height={40}
                                        />    
                                    </div>
                                    <div>
                                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                                            <div className='flex items-center gap-1'>
                                                {
                                                    conv?.lastMsg?.imageUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaImage /></span>
                                                            {!conv?.lastMsg?.text && <span>Image</span>  } 
                                                        </div>
                                                    )
                                                }
                                                {
                                                    conv?.lastMsg?.videoUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaVideo/></span>
                                                            {!conv?.lastMsg?.text && <span>Video</span>}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                        </div>
                                    </div>
                                    {
                                        Boolean(conv?.unseenMsg) && (
                                            <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                        )
                                    }

                                </NavLink>
                            )
                        })
                    }
          










</div>

</div> 


{
        editUserOpen && (
            <EditUserDetail onClose={()=>setEditUserOpen(false)} user={user}/>
        )
    } 

    {/* serachbar */}

    {
       openSearchUser && (
        <SearchUser onClose={()=>setOpenSearchUser(false)}/>
       )
    }
    </div> 


  )
}

export default Sidebar


