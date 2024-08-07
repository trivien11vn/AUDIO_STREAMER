import React from 'react'
import logoLight from '../assets/logo-light.svg'
import {sidebarMenu} from '../utils/constant'
import { NavLink, } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'


const notActiveStyle = 'py-2 px-[25px] border font-bold text-[#32323D] text-[13px] flex items-center gap-3'
const activeStyle = 'py-2 px-[25px] border font-bold text-[#0F7070] text-[13px] flex items-center gap-3'

const LeftSidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col bg-main-200 h-full'>
      <div onClick={()=>navigate(`${path.HOME}`)} className='w-full h-[70px] min-[1024px]:py-[15px] min-[1024px]:px-[25px] flex items-center justify-start cursor-pointer'>
      {/*COVER: ưu tiên kích thước, chấp nhận mất 1 phần của ảnh
        CONTAIN: ưu tiên ảnh, lấy chiều rộng/cao để full 1 trong 2 */}
      <img src={logoLight} alt='logo' className='w-[120px] h-10 min-[1024px]:block hidden'></img>
      <img src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.10.46/static/media/icon_zing_mp3_60.f6b51045.svg' alt='logo' className='w-[95px] h-[45px] min-[1024px]:hidden'></img>
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
              <span className='min-[1024px]:inline hidden'>{item?.text}</span>
            </NavLink>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar