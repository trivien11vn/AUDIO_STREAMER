import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { searchMenu } from '../../utils/constant'
import clsx from 'clsx'
const Searchh = () => {
  return (
    <div className='w-full'>
      <div className='flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1'>
        <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
        <div className='flex items-center'>
          {searchMenu?.map(item => (
            <NavLink 
              key={item?.path} 
              to={item?.path}
              className={({isActive})=>clsx('px-4 hover:text-main-500 font-semibold cursor-pointer h-[52px] flex items-center', isActive && 'text-main-500 border-b-2 border-main-500')}
            >
            {item?.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
      <div className='w-full h-[90px]'>

      </div>
    </div>
  )
}

export default Searchh