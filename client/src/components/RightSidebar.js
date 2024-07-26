import React from 'react'
import icons from '../utils/icons'
const RightSidebar = () => {
  const  {FaRegTrashCan} = icons
  return (
    <div className='flex flex-col text-xs w-full'>
      <div className='h-[70px] py-[14px] px-2 flex-none border border-red-500 flex items-center gap-8'>
        <div className='flex flex-auto gap-8 justify-center'>
          <span>Danh sách phát</span>
          <span>Nghe gần đây</span>
        </div>
        <span className='p-1 rounded-full hover:bg-main-500 hover:text-white cursor-pointer'>
          <FaRegTrashCan size={14}/>
        </span>
      </div>
      <div className='border border-green-500'>body</div>
    </div>
  )
}

export default RightSidebar