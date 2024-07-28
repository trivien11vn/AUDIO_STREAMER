import React, { memo } from 'react'
import { handleRound } from '../utils/fn'
import icons from '../utils/icons'
const {RiUserAddFill} = icons
const Artist = ({data}) => {
  console.log(data)
  return (
    <div className='w-1/5 flex flex-col gap-[15px]'>
      <img src={data?.thumbnailM} className='w-[full] object-contain rounded-full'></img>
      <div className='flex flex-col gap-1 items-center'>
        <span className='text-sm font-medium'>{data?.name}</span>
        <span className='text-xs opacity-70'>{`${handleRound(data?.totalFollow)} quan tâm`}</span>
        <button
          type='button'
          className='text-white bg-main-500 px-4 py-2 rounded-l-full rounded-r-full flex items-center justify-center gap-1'>
          <RiUserAddFill size={15}/>
          <span className='text-xs opacity-70'>QUAN TÂM</span>
        </button>
      </div>
    </div>
  )
}

export default memo(Artist)