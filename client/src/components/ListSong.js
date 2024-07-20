import React from 'react'
import ListItem from './ListItem'

const ListSong = ({song}) => {
    console.log(song)
  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
        <div className='flex justify-between items-center p-[10px] font-semibold'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>
        <div>
            {song?.map((item, index) => (
                <ListItem songData={item} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default ListSong