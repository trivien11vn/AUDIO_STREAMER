import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar, Player, RightSidebar, Header, Loading} from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const Public = () => {
  const [isDisplay, setIsDisplay] = useState(true)
  const {isLoading} = useSelector(state => state.app)
  return (
    <div className='w-full relative h-screen flex flex-col bg-main-300'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] h-full flex-none'>
          <LeftSidebar />
        </div>
        <div className='flex-auto relative flex flex-col'>
          {
            isLoading && 
            <div className='absolute inset-0 bg-main-300 z-50 flex items-center justify-center'>
              <Loading />
            </div>
          }
          <div className='h-[70px] px-[59px] flex items-center flex-none'>
            <Header />
          </div>
          <div className='flex-auto w-full'>
            <Scrollbars autoHide style={{ width: '100%', height: '100%'}}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isDisplay &&
        <div className='w-[329px] flex-none animate-slide-left h-screen'>
          <RightSidebar />
        </div>
        }
      </div>
      <div className='h-[90px] fixed bottom-0 left-0 right-0 z-[99]'>
        <Player setIsDisplay = {setIsDisplay}/>
      </div>
    </div>
  )
}

export default Public