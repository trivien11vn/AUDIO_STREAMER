import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getArrSlider } from '../utils/fn'
import {playSong, setCurrentSongId} from '../store/actions'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
    const {banner} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      const sliderEls = document.getElementsByClassName('slider-item')
      let min = 0 
      let max = 2
      const intervalId = setInterval(() => {
        const list = getArrSlider(min, max, sliderEls?.length - 1)
        // Delete animation class
        for(let i=0; i<sliderEls?.length; i++){
          sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
          sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
          sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')

          if(list.some(item => item === i)){
            sliderEls[i].style.cssText = 'display:block'
          }
          else{
            sliderEls[i].style.cssText = 'display:none'
          }
        }

        // Add animation class
        list.forEach(item => {
          if(item === max){
            sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
          }
          else if(item === min){
            sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
          }
          else{
            sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10')
          }
        })
        if(min === sliderEls?.length - 1){
          min = 0
        }
        else{
          min += 1
        }

        if(max === sliderEls?.length - 1){
          max = 0
        }
        else{
          max += 1
        }

      }, 3000);
      return () => { 
        intervalId && clearInterval(intervalId)
       }
    }, [])

    const handleClickBanner = (el) => {
      if(el?.type === 1){
        dispatch(setCurrentSongId(el?.encodeId))
        dispatch(playSong(true))
      }
      else if(el?.type === 4){
        const path = el?.link?.split('.')[0]
        navigate(path)
      }
    }
    
  return (
    <div className='w-full overflow-hidden px-[59px]'>
      <div className='flex w-full gap-8 pt-8'>
        {banner?.map((el,index) => (
            <img 
              onClick={()=>handleClickBanner(el)}
              key={el?.encodeId} 
              src={el?.banner} 
              className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <=2 ? 'block' : 'hidden'}`}
              />
        ))}
    </div>
    </div>
  )
}

export default Slider