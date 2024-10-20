import React from 'react'
import CollapsibleNavbar from './CollapsibleNavbar'
import Navbar from './Navbar'

const Layout = ({children,role}) => {
  return (
    <div className=' h-screen layout'>      
        <Navbar></Navbar>
        <div className='h-full flex bg-gray-100 overflow-scroll'>
          <CollapsibleNavbar role={role} ></CollapsibleNavbar>
          {children}
        </div>
        
    </div>
  )
}

export default Layout