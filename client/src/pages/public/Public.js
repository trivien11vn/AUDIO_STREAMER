import React from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar, Player, RightSidebar, Header } from '../../components'
const Public = () => {
  return (
    <div className='w-full relative h-screen flex flex-col bg-main-300'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] h-full flex-none'>
          <LeftSidebar />
        </div>
        <div className='flex-auto w-fit h-fit'>
          <div className='h-[70px] px-[59px] flex items-center'>
            <Header />
          </div>
          <Outlet />
          <div className='w-full h-[500px]'></div>
        </div>
        <div className='w-[329px] flex-none hidden 1600:flex animate-slide-left'>
          <RightSidebar />
        </div>
      </div>
      <div className='h-[90px] fixed bottom-0 left-0 right-0 z-[99]'>
        <Player />
      </div>
    </div>
  )
}

export default Public