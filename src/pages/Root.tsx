import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Root: React.FC = () => {
  return (
    <div className="bg-[#0a0f18] min-h-screen py-4 px-10"> 
      <Header />
      <div className='mx-auto max-w-480'>
        <Outlet />
      </div>
    </div>
  )
}

export default Root