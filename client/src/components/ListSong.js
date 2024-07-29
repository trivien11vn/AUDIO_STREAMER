import React, { memo } from 'react'
import ListItem from './ListItem'
import moment from 'moment'
import { GoDotFill } from "react-icons/go";
import { useSelector } from 'react-redux';

const ListSong = ({totalDuration, isHideTime, isHideNode}) => {
    const {album} = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
        <div className='flex justify-between items-center p-[10px] font-semibold'>
            <span className={isHideTime ? 'font-bold text-lg' : ''}>BÀI HÁT</span>
           {!isHideTime && <span>ALBUM</span>}
           {!isHideTime && <span>THỜI GIAN</span>}
        </div>
        <div className='flex flex-col '>
            {album?.map((item, index) => (
                <ListItem songData={item} key={item?.encodeId} isHideNode={isHideNode}/>
            ))}
        </div>
        {totalDuration &&
            <span className='flex gap-1 items-center py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
                <span>{`${album?.length} bài hát`}</span>
                <GoDotFill size={12}/>
                <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
            </span>
        }
    </div>
  )
}

export default memo(ListSong)