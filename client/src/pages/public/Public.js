import React from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar, Player, RightSidebar, Header } from '../../components'
const Public = () => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-main-300'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] min-h-full flex-none'>
          <LeftSidebar />
        </div>
        <div className='flex-auto'>
          <div className='h-[70px] px-[59px] flex items-center mb-5'>
            <Header />
          </div>
          <Outlet />
        </div>
        <div className='w-[329px] flex-none hidden 1000:flex animate-slide-left'>
          <RightSidebar />
        </div>
      </div>
      <div className='flex-none h-[90px]'>
        <Player />
      </div>
    </div>
  )
}

export default Public