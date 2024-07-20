import React, { memo } from 'react'
import icons from '../utils/icons'
import moment from 'moment';

const {FaMusic} = icons
const ListItem = ({songData}) => {
    console.log(songData)
  return (
    <div className='flex justify-between items-center p-[10px]'>
        <div className='flex items-center gap-3 flex-1'>
            <span><FaMusic /></span>
            <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover border rounded-md'></img>
            <span className='flex flex-col w-full'>
                <span className='text-sm font-semibold line-clamp-1'>{songData?.title}</span>
                <span className='text-xs'>{songData?.artistsNames}</span>
            </span>
        </div>
        <div className='flex-1 flex justify-center'>
          {songData?.album?.title}
        </div>
        <div className='flex-1 flex justify-end'>
        {moment.utc(songData?.duration*1000).format('mm:ss')}
        </div>
    </div>
  )
}

export default memo(ListItem)