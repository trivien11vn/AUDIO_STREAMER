import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { LeftSidebar, Player, RightSidebar, Header, Loading} from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { setScroll } from '../../store/actions';
const Public = () => {
  const [isDisplay, setIsDisplay] = useState(true)
  const {isLoading, scrollTop} = useSelector(state => state.app)
  const {singer} = useParams()
  const dispatch = useDispatch()

  const handleScroll = (e) => {
    if(singer){
      e.target.scrollTop === 0 ? dispatch(setScroll(true)) : dispatch(setScroll(false))
    }

  }
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
          <div className={clsx('h-[70px] fixed top-0 left-[240px] right-[0px] px-[59px] z-50 flex items-center', scrollTop ? 'bg-transparent' : 'bg-main-300')}>
            <Header />
          </div>
          <div className='flex-auto w-full'>
            <Scrollbars onScroll={handleScroll} autoHide style={{ width: '100%', height: '100%'}}>
              <Outlet />
              <div className='h-[120px] w-full'></div>
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