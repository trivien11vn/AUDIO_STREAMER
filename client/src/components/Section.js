import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const Section = () => {
    const {chill} = useSelector(state => state.app)
    console.log(chill)
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{chill?.title}</h3>
            <span className='text-xs uppercase'>Tất cả</span>
        </div>
        <div className='flex items-center justify-between gap-[28px]'>
            {chill?.items?.slice(0,5)?.map(el=>(
                <div key={el?.encodeId} className='flex flex-col gap-2 flex-auto w-1/5 text-sm'>
                    <img src={el?.thumbnailM} alt='image-chill' className='w-full h-auto rounded-lg'/>
                    <span className='font-semibold line-clamp-1'>{el?.title}</span>
                    <span className='line-clamp-1'>{el?.sortDescription}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Section)