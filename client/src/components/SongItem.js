import React, { memo } from 'react'
import moment from 'moment';
import 'moment/locale/vi';

const SongItem = ({thumbnail, title, artists, release}) => {
  return (
    <div className='w-[30%] flex-auto flex gap-[10px] p-[10px] hover:bg-main-200 rounded-md cursor-pointer'>
      <img src={thumbnail} alt='thumbnail' className='w-[60px] h-[60px] object-cover rounded-md'/>
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-semibold line-clamp-1'>{title}</span>
        <span className='text-xs text-gray-700 line-clamp-1'>{artists}</span>
        <span className='text-xs text-gray-700 line-clamp-1'>{moment(release * 1000).fromNow()}</span>
      </div>
    </div>
  )
}

export default memo(SongItem)