import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom' // /:id
import { apiGetArtist } from '../../apis/music';
import icons from '../../utils/icons';

const {FaPlay, RiUserAddFill} = icons
const Singer = () => {
  const {singer} = useParams() 
  const [artistData, setArtistData] = useState(null)
  const [isHover, setIsHover] = useState(false)
  useEffect(() => {
    const fetchArtistData = async() => { 
      const response = await apiGetArtist(singer)
      if(response?.data?.err === 0){
        setArtistData(response?.data?.data)
      }
     }
    if(singer){
      fetchArtistData()
    }
  }, [singer]);
  return (
    <div className='flex flex-col w-full'>
      <div className='relative'>
      <img className='h-[400px] w-full object-cover' src={artistData?.cover} alt='background'></img>
      <div className='absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] text-white'>
        <div className='absolute bottom-0 pb-6'>
          <div className='flex gap-8 items-center'>
            <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
            <span 
              className='p-3 relative rounded-full bg-white text-main-500 hover:text-white cursor-pointer'
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className='w-4 h-4'></div>
              {isHover && 
              <span className='absolute top-[-1px] bottom-[-1px] left-[-1px] right-[-1px] animate-scale-up-center bg-main-500 rounded-full'></span>}
              <span className='absolute p-3 inset-0 z-50'> <FaPlay size={16}/></span>
            </span>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <span className='text-sm text-gray-300'>{`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
            <button
              type='button'
              className='text-white bg-main-500 px-4 py-2 rounded-l-full rounded-r-full flex items-center justify-center gap-1'>
              <RiUserAddFill size={15}/>
              <span className='text-xs opacity-90'>QUAN TÂM</span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Singer