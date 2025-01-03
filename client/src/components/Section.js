import React, { memo, useState } from 'react'
import {SectionItem} from './'

const Section = ({data}) => {
  return (
    <div className='mt-12 px-[44px] flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold pl-4'>{data?.title}</h3>
            <span className='text-xs uppercase'>Tất cả</span>
        </div>
        <div className='flex'>
            {data?.items?.slice(0,5)?.map(el=>(
                <SectionItem key={el?.encodeId} data={el} dataa={data}/>
            ))}
        </div>
    </div>
  )
}

export default memo(Section)