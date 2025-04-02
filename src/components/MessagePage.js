



import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile'; // Ensure this is imported
import { IoMdClose } from "react-icons/io";
import Loading from './Loading';
import backgroundImage from '../assets/wallapaper.jpeg'
import { IoSend } from "react-icons/io5";
import moment from 'moment'


const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  })
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
const [message,setMessage] = useState({
  text : "",
  imageUrl : "",
  videoUrl : ""
 })

 const[loading,setLoading]=useState(false)
 const [allMessage,setAllMessage] =  useState([])
 const currentMessage = useRef(null)


 useEffect(()=>{
  if(currentMessage.current){
    currentMessage.current.scrollIntoView({behavior : 'smooth',block:'end'})

  }

 },[allMessage])


  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev)
  }

  const handleUploadImage = async(e) => {
   
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(preve =>{
 return{
  ...preve,
  imageUrl  : uploadPhoto.url
 }
    })
        }
const handleClearUploadImage =()=>{
  setMessage(preve =>{
    return{
     ...preve,
     imageUrl  : ""
    }
       })
}




  const handleUploadVideo = async (e) => {

    const file = e.target.files[0]
    setLoading(true)

    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(preve =>{
 return{
  ...preve,
  videoUrl : uploadPhoto.url
 }})}
 const handleClearUploadVideo =()=>{
  setMessage(preve =>{
    return{
     ...preve,
     videoUrl  : ""
    }
       })
}
  

  // useEffect(() => {
  //   if (socketConnection && params.userId) {
  //     socketConnection.emit('message-page', params.userId)

  //     socketConnection.on('message-user', (data) => {
  //       setDataUser(data)
  //     })
  //     socketConnection.on('message',(data)=>{
  //       console.log('message data',data)
  //       setAllMessage(data)
  //     })
  //   }
  // }, [socketConnection, params?.userId])

  useEffect(() => {
    if (socketConnection && params.userId) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.emit('seen',params.userId)
      socketConnection.on('message-user', (data) => {
        setDataUser(data);
      });
      socketConnection.on('message', (data) => {
        // console.log("message data",message)
        setAllMessage(data);
      });
  
      return () => {
        socketConnection.off('message-user');
        socketConnection.off('message');
      };
    }
  }, [socketConnection,params?.userId,user]);
  

  const handleOnChange =(e)=>{
  const { name, value } =e.target
    setMessage(preve=>{
      return{
        ...preve,
        text : value
      }
    })
  }

  const handleSendMessage =(e)=>{
    e.preventDefault()
    if(message.text || message.imageUrl || message.videoUrl){
      if(socketConnection){
        socketConnection.emit('new message',{
          sender : user?._id,
          reciever : params.userId,
          text : message.text,
          imageUrl : message.imageUrl,
          videoUrl : message.videoUrl,
          msgByUserId : user?._id
        })

        setMessage({
            text : "",
            imageUrl : "",
            videoUrl : ""
           
      })
      }
    }
  }



// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import Avatar from '../components/Avatar';
// import { HiDotsVertical } from "react-icons/hi";
// import { FaAngleLeft } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa";
// import { FaImage } from "react-icons/fa6";
// import { FaVideo } from "react-icons/fa6";
// import uploadFile from '../helpers/uploadFile'; // Ensure this is imported
// import { IoMdClose } from "react-icons/io";
// import Loading from './Loading';
// import backgroundImage from '../assets/wallapaper.jpeg';
// import { IoSend } from "react-icons/io5";
// import moment from 'moment';

// const MessagePage = () => {
//   const params = useParams();
//   const socketConnection = useSelector(state => state?.user?.socketConnection);
//   const user = useSelector(state => state?.user);
  
//   const [dataUser, setDataUser] = useState({ name: "", email: "", profile_pic: "", online: false, _id: "" });
//   const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
//   const [message, setMessage] = useState({ text: "", imageUrl: "", videoUrl: "" });
//   const [loading, setLoading] = useState(false);
//   const [allMessage, setAllMessage] = useState([]);

//   const handleUploadImageVideoOpen = () => setOpenImageVideoUpload(prev => !prev);

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];
//     setLoading(true);
//     const uploadPhoto = await uploadFile(file);
//     setLoading(false);
//     setMessage(prev => ({ ...prev, imageUrl: uploadPhoto.url }));
//     setOpenImageVideoUpload(false);
//   };

//   const handleUploadVideo = async (e) => {
//     const file = e.target.files[0];
//     setLoading(true);
//     const uploadPhoto = await uploadFile(file);
//     setLoading(false);
//     setMessage(prev => ({ ...prev, videoUrl: uploadPhoto.url }));
//   };

//   const handleClearUploadImage = () => setMessage(prev => ({ ...prev, imageUrl: "" }));
//   const handleClearUploadVideo = () => setMessage(prev => ({ ...prev, videoUrl: "" }));

//   // useEffect(() => {
//   //   if (socketConnection && params.userId) {
//   //     socketConnection.emit('message-page', params.userId);

//   //     socketConnection.on('message-user', (data) => {
//   //       setDataUser(data);
//   //     });

//   //     socketConnection.on('message', (messages) => {
//   //       if (Array.isArray(messages)) {
//   //         setAllMessage(messages);
//   //       }
//   //     });

//   //     return () => {
//   //       socketConnection.off('message-user');
//   //       socketConnection.off('message');
//   //     };
//   //   }
//   // }, [socketConnection, params?.userId, user]);

//   useEffect(() => {
//     // Ensure the socket connection and params.userId are available
//     if (socketConnection && params.userId) {
//       // Emit the event to get the messages for this user
//       socketConnection.emit('message-page', params.userId);
  
//       // Listen for user data when the "message-user" event is triggered
//       socketConnection.on('message-user', (data) => {
//         setDataUser(data);
//       });
  
//       // Listen for incoming messages when the "message" event is triggered
//       socketConnection.on('message', (messages) => {
//         if (Array.isArray(messages)) {
//           setAllMessage(messages);  // Set the received messages to state
//         }
//       });
  
//       // Cleanup function to remove event listeners when component unmounts or dependencies change
//       return () => {
//         socketConnection.off('message-user');
//         socketConnection.off('message');
//       };
//     }
//   }, [socketConnection, params.userId,user]);  // Only depend on socketConnection and params.userId
  

//   const handleOnChange = (e) => {
//     const { value } = e.target;
//     setMessage(prev => ({ ...prev, text: value }));
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.text.trim() || message.imageUrl || message.videoUrl) {
//       if (socketConnection) {
//         socketConnection.emit('new message', {
//           sender: user._id,
//           reciever: params.userId,
//           text: message.text.trim(),
//           imageUrl: message.imageUrl,
//           videoUrl: message.videoUrl,
//           msgByUserId: user?._id
//         });
//         setMessage({ text: "", imageUrl: "", videoUrl: "" });
//       }
//     } else {
//       console.log('Message is empty');
//     }
//   };




  return (
    <div style={{backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-14 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <div>
            <Link to={"/"} className='lg:hidden'>
              <FaAngleLeft size={25} />
            </Link>
          </div>
          <div>
            <Avatar height={50} width={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 mb-1 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {dataUser.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>}
            </p>
          </div>
        </div>
        <div>
          <button className='cursor-pointer hover:text-primary'> <HiDotsVertical /> </button>
        </div>
      </header>

      {/* All messages */}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
  

  
{/* //all msg show here */}
 <div className='flex flex-col gap-2 py-2 mx-2 ' ref={currentMessage} > 
  {allMessage.map((msg,index)=>{
    return(
      <div className={`bg-white px-3 py-1 rounded w-fit max-w-[280px] md-max-w-sm lg:max-w-md ${user._id === msg.msgByUserId  ? "ml-auto bg-teal-100" : "" }`}>
      <div className='w-full'>
        { msg?.imageUrl && (
 
<img src ={msg?.imageUrl}
className='w-full h-full object-scale-down'/>
 
       )}
  { msg?.videoUrl && (
 
<video  src ={msg.videoUrl}
className='w-full h-full object-scale-down'  controls/>
  
        )}</div>
   
        <p className='px-2'> {msg.text}</p>
        <p className='text-xs ml-auto w-fit'> {moment(msg.createdAt).format('hh:mm')}</p>
      </div>
    )

  })
}
</div>
  
  
  
  {/* Upload image display */}
  {message.imageUrl && (
    <div className="w-full h-full bg-slate-700 stick bottom-0  bg-opacity-25 flex justify-center items-center rounded overflow-hidden">

      <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-800' onClick={handleClearUploadImage}>

      <IoMdClose size={30}/>
      </div>
      <div className="bg-white p-3">
        <img
          src={message.imageUrl}
          width={300}
          height={300}
          alt="uploadImage"
          className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
        />
      </div>
    </div>
  )}



{message.videoUrl && (
    <div className="w-full h-full bg-slate-700 stick bottom-0 bg-opacity-25 flex justify-center items-center rounded overflow-hidden">

      <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-800' onClick={handleClearUploadVideo}>

      <IoMdClose size={30}/>
      </div>
      <div className="bg-white p-3">
    <video src ={message.videoUrl}
    width={300}
    height={300}
    className='aspect-square w-full h-full max-w-sm m-2'
    controls
    muted
    autoPlay/>
      </div>
    </div>
  )}
  {
    loading &&(
      <div className='w-full h-full   flex stick bottom-0 justify-center items-center'>
      <Loading/>
      </div>
    )
  }

</section>


  

      {/* Send message */}
      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative'>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20} />
          </button>

          {/* Image/Video Upload */}
          {openImageVideoUpload && (
            <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-primary'>
                    <FaImage size={10} />
                  </div>
                  <p>Image</p>
                </label>

                <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-purple-500'>
                    <FaVideo size={10} />
                  </div>
                  <p>Video</p>
                </label>

                <input type="file" id="uploadImage" onChange={handleUploadImage}  className='hidden'/>
                <input type="file" id="uploadVideo" onChange={handleUploadVideo}  className='hidden'/>
              </form>
            </div>
          )}
        </div>

{/* 
        input box */}

<form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
       
          <input type="text" name="" id=""  placeholder='Type Here Msg.... '
           className='py-1 px-4 outline-none w-full h-full
           ' value={message.text} onChange={handleOnChange}/>

           <button className='text-primary'> <IoSend size={27}/></button>
       </form>
      </section>
    </div>
  )
}

export default MessagePage
 




