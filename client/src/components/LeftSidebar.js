import React from 'react'
import logoLight from '../assets/logo-light.svg'
import {sidebarMenu} from '../utils/constant'
import { NavLink, } from 'react-router-dom'

const notActiveStyle = 'py-2 px-[25px] border font-bold text-[#32323D] text-[13px] flex items-center gap-3'
const activeStyle = 'py-2 px-[25px] border font-bold text-[#0F7070] text-[13px] flex items-center gap-3'

const LeftSidebar = () => {
  return (
    <div className='flex flex-col bg-[#DDE4E4]'>
      <div className='w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start'>
      {/*COVER: ưu tiên kích thước, chấp nhận mất 1 phần của ảnh
        CONTAIN: ưu tiên ảnh, lấy chiều rộng/cao để full 1 trong 2 */}
      <img src={logoLight} alt='logo' className='w-[120px] h-10'></img>
      </div>

      <div className='flex flex-col'>
        {
          sidebarMenu?.map(item => (
                /*
                className={({isActive}) => isActive ? activeStyle : notActiveStyle}
                
                hoặc
                --- tra ve 1 khoi lenh ---
                className={({isActive}) => { return isActive ? activeStyle : notActiveStyle }}
               */
            <NavLink 
              to={item?.path} 
              className={({isActive})=> isActive ? activeStyle : notActiveStyle}
              key={item?.path}
            >
              {item?.icon}
              <span>{item?.text}</span>
            </NavLink>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar