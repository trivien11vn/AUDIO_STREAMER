import React from 'react'
import { useSelector } from 'react-redux'

const Slider = () => {
    const {banner} = useSelector(state => state.app)
    console.log(banner)
  return (
    <div className='flex flex-col'>
        {banner?.map(el => (
            <img key={el?.encodeId} src={el?.banner} className='flex-1 object-contain'/>
        ))}
    </div>
  )
}

export default Slider