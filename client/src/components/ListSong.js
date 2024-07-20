import React, { memo } from 'react'
import ListItem from './ListItem'

const ListSong = ({song, totalDuration}) => {
    console.log(song)
  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
        <div className='flex justify-between items-center p-[10px] font-semibold'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>
        <div className='flex flex-col '>
            {song?.map((item, index) => (
                <ListItem songData={item} key={item?.encodeId}/>
            ))}
        </div>
    </div>
  )
}

export default memo(ListSong)