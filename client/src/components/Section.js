import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Section = ({data}) => {
    const navigate = useNavigate()
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{data?.title}</h3>
            <span className='text-xs uppercase'>Tất cả</span>
        </div>
        <div className='flex items-center justify-between gap-[28px]'>
            {data?.items?.slice(0,5)?.map(el=>(
                <div 
                    onClick={() => {
                        const path = el?.link?.split('.')[0]
                        navigate(path)
                    }}      
                    key={el?.encodeId} 
                    className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'>
                    <img src={el?.thumbnailM} alt='image-chill' className='w-full h-auto rounded-lg'/>
                    <span className='flex flex-col'>
                        <span className='font-semibold line-clamp-1'>{el?.title}</span>
                        {data?.sectionId === 'h100' ? <span className='line-clamp-1'>{el?.artistsNames}</span> : <span className='line-clamp-1'>{el?.sortDescription}</span>}
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Section)