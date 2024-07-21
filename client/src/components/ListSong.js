import React, { memo } from 'react'
import ListItem from './ListItem'
import moment from 'moment'
import { GoDotFill } from "react-icons/go";

const ListSong = ({song, totalDuration}) => {
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
        <span className='flex gap-1 items-center py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
            <span>{`${song?.length} bài hát`}</span>
            <GoDotFill size={12}/>
            <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
        </span>
    </div>
  )
}

export default memo(ListSong)