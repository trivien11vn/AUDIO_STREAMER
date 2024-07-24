import React, { memo, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../utils/icons'

const SectionItem = ({data, dataa}) => {
  const { GoHeart,  GoHeartFill, FaPlay, TbDots} = icons
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState(false)
  const imageRef = useRef()
  
  const handleHoverImage = () => {
    console.log(imageRef.current)
      setIsHover(true)
      imageRef.current.classList?.remove('animate-scale-down-image')
      imageRef.current.classList?.add('animate-scale-up-image')
  }
  const handleLeaveImage = () => {
    setIsHover(false)
    imageRef.current.classList?.remove('animate-scale-add-image')
    imageRef.current.classList?.add('animate-scale-down-image')
}
  return (
    <div 
      onClick={() => {
          const path = data?.link?.split('.')[0]
          navigate(path, {
            state: {playAlbum: false}
          })
      }}      
      className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'
  >
      <div onMouseEnter={handleHoverImage} onMouseLeave={handleLeaveImage} className='w-full relative overflow-hidden rounded-lg'>
          <img ref={imageRef} src={data?.thumbnailM} alt='image-chill' className='w-full h-auto rounded-lg'/>
          {isHover && <div className='absolute inset-0 bg-overlay-30 rounded-lg z-40 text-white flex items-center justify-center gap-2'>
            <span><GoHeart size={24}/></span>
            <span 
              onClick={(e) => {
                    e.stopPropagation();
                    const path = data?.link?.split('.')[0];
                    navigate(path, {
                      state: {playAlbum: true}})
                  }}  
              className='p-2 border border-white rounded-full'>
                <FaPlay size={20}/>
            </span>
            <span><TbDots size={24}/></span>
          </div>}
      </div> 
      <span className='flex flex-col'>
          <span className='font-semibold line-clamp-1'>{data?.title}</span>
          {dataa?.sectionId === 'h100' ? <span className='line-clamp-1'>{data?.artistsNames}</span> : <span className='line-clamp-1'>{data?.sortDescription}</span>}
      </span>
  </div>
  )
}

export default memo(SectionItem)