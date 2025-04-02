import React from 'react'
// import { FaUserTie } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar=({userId,name,imageUrl,width,height}) =>{

  const onlineUser = useSelector(state=> state?.user?.onlineUser)
let avatarName = ""

if(name){
    const splitName = name?.split(" ")

        if(splitName.length > 1){
            avatarName = splitName[0][0]+splitName[1][0]
        }
        else{
            avatarName = splitName[0][0]
        }
}

const bgcolor = [
    'bg-green-100',
    'bg-gray-100',
    'bg-yellow-100',
    'bg-orange-100',
    'bg-blue-100',
    'bg-neutral-150'
]
const randomNumber = Math.floor(Math.random() * 5)

const isOnline = onlineUser.includes(userId)



  return (
    <div className={`text-slate-800  rounded-full  text-xl font-bold relative `} style={{width : width+"px" , height: height+"px" }} >
      {
        imageUrl ? (
            <img 
            src={imageUrl}
            width={width}
            height={height}
            alt={name}
            className='overflow-hidden rounded-full'
            />
        ):(
            name ? (
                <div style={{width : width+"px" , height: height+"px" }} 
                className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgcolor[randomNumber]}`}>
                {avatarName}
                </div>
            ):(
                // <FaUserTie  size={width}/>
                  <PiUserCircleFill  size={width}/>

            )
        )
      }
     {
      isOnline && (
        <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>

      )
     }
    </div>
  )
}

export default Avatar
