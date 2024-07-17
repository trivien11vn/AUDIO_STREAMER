import React from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar, RightSidebar } from '../../components'
const Public = () => {
  return (
    <div className='w-full flex bg-[#CED9D9]'>
      <div className='w-[240px] flex-none'>
        <LeftSidebar />
      </div>
      <div className='flex-auto'>
        <Outlet />
      </div>
      <div className='w-[329px] flex-none '>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Public