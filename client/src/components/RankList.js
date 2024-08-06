import React, { memo, useState } from 'react'
import ListItem from './ListItem'
import { useNavigate } from 'react-router-dom'
import path from '../../src/utils/path'

const RankList = ({data, limitt, isHideAlbum, link}) => {
    const [limit, setLimit] = useState(limitt)
    const navigate = useNavigate()
  return (
    <div className='w-full'>
    {data?.slice(0,limit)?.map((item, index) => (
          <ListItem 
            key={item?.encodeId}
            songData={item}
            isHideNode={true}
            order={index + 1}
            isHideAlbum={isHideAlbum}
          />
        ))}
        <div className='flex w-full justify-center items-center'>
          <button 
            onClick={()=>{link ? navigate(link?.split('.')[0]) : limit === limitt ? setLimit(100) : setLimit(limitt)}}
            type='button' 
            className='px-6 py-2 border border-main-500 text-main-500 hover:text-white hover:bg-main-500 text-sm rounded-l-full rounded-r-full '>
            {limit === limitt ? 'Hiện thêm' : 'Ẩn bớt'}
          </button>
        </div>
    </div>
  )
}

export default memo(RankList)