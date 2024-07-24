import clsx from 'clsx'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SongItem from './SongItem'
const NewRelease = () => {
    const {newRelease} = useSelector(state => state.app)
    console.log(newRelease)
    const [isActive, setIsActive] = useState(0)
    const [songs, setSongs] = useState([])
    useEffect(() => {
        console.log(isActive)
        if(isActive === 0 ){
            setSongs(newRelease?.items?.vPop)
        }
        else {
            setSongs(newRelease?.items?.others)
        }
    }, [isActive, newRelease]);
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
            <span className='text-xs uppercase'>Tất cả</span>
        </div>
        <div className='flex items-center gap-5 text-xs'>
            <button
                type='button'
                onClick={() => setIsActive(0)}
                className= {clsx('py-1 px-4 rounded-l-full rounded-r-full border border-gray-400', isActive === 0 ? 'bg-main-500 text-white' : 'bg-transparent')}
            >
                VIỆT NAM
            </button>
            <button
                type='button'
                onClick={() => setIsActive(1)}
                className=  {clsx('py-1 px-4 rounded-l-full rounded-r-full border border-gray-400', isActive === 1 ? 'bg-main-500 text-white' : 'bg-transparent')}
            >
                QUỐC TẾ
            </button>
        </div>
        <div className='flex flex-wrap w-full'>
            {songs?.map(el => (
                <SongItem 
                    thumbnail={el?.thumbnail}
                    title={el?.title}
                    artists={el?.artistsNames}
                    release={el?.releaseDate}
                    key={el?.encodeId}
                    sid={el?.encodeId}
                    />
            ))}
        </div>
    </div>
  )
}

export default memo(NewRelease)