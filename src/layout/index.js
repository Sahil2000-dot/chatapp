

import React from 'react'
// import logo from '../assets/logo.jpg'
import logo from '../assets/whatsapp.png'

const AuthLayouts = ({children}) => {
  return (
  <>
  <header className=' flex justify-center items-center py-8 h-20 shadow-lg bg-white'>
 
    <img 
    src = {logo}
    alt = 'logo'
    width = {100}
    height = {60}
        />
  </header>

  {children}
  </>
  )
}

export default AuthLayouts

