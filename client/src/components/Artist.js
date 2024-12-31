import React, { memo , useRef, useState} from 'react'
import { handleRound } from '../utils/fn'
import icons from '../utils/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const {RiUserAddFill} = icons
const Artist = ({data}) => {
  const handleHoverImage = () => {
    setIsHover(true)
    imageRef.current.classList?.remove('animate-scale-down-image')
    imageRef.current.classList?.add('animate-scale-up-image')
  }
  const handleLeaveImage = () => {
    setIsHover(false)
    imageRef.current.classList?.remove('animate-scale-up-image')
    imageRef.current.classList?.add('animate-scale-down-image')
  }
  const [isHover, setIsHover] = useState(false)
  const imageRef = useRef()
  return (
    <div className='w-1/5 flex flex-col gap-[15px]'>
      <Link
        to={data?.link}
        onMouseEnter={handleHoverImage} 
        onMouseLeave={handleLeaveImage} 
        className='relative overflow-hidden rounded-full cursor-pointer'>
        <img ref={imageRef} src={data?.thumbnailM} className='w-[full] object-contain rounded-full' />
        {isHover && 
          <div className='absolute inset-0 bg-overlay-30 rounded-full'>
          </div>
        }
      </Link>
      <div className='flex flex-col gap-1 items-center'>
        <Link to={data?.link} className='text-sm font-medium hover:underline hover:text-main-500'>{data?.name}</Link>
        <span className='text-xs opacity-70'>{`${handleRound(data?.totalFollow)} quan tâm`}</span>
        <button
          type='button'
          className='text-white bg-main-500 px-4 py-2 rounded-l-full rounded-r-full flex items-center justify-center gap-1'>
          <RiUserAddFill size={15}/>
          <span className='text-xs opacity-70'>QUAN TÂMM</span>
        </button>
      </div>
    </div>
  )
}

export default memo(Artist)