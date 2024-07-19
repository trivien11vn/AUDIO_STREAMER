import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { apiDetailSong, apiInfoSong } from '../apis';
import icons from '../utils/icons';

const Player = () => {
    const {GoHeart, GoHeartFill, TbDots} = icons
    const {currentSongId} = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    
    useEffect(() => {
      const fetchSong = async() => {
        const response = await apiInfoSong(currentSongId)
        if(response?.data?.err === 0){
          setSongInfo(response?.data?.data)
        }
      }
      fetchSong()
    }, [currentSongId]);
    
  return (
    <div className='bg-main-400 px-5 h-full flex'>
        <div className='w-[30%] flex-auto border border-red-500 flex gap-3 items-center'>
          <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover border rounded-md'/>
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-700 text-[14px]'>{songInfo?.title}</span>
            <span className='text-[12px] text-gray-500'>{songInfo?.artistsNames}</span>
          </div>
          <div className='flex gap-4 pl-2'>
            <span><GoHeart size={16}/></span>
            <span><TbDots size={16}/></span>
          </div>
        </div>
        <div className='w-[40%] flex-auto border border-red-500'>Main</div>
        <div className='w-[30%] flex-auto border border-red-500'>Volumn</div>
    </div>
  )
}
  
export default Player