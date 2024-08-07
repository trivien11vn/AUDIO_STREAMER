import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getArrSlider } from '../utils/fn'
import {getSongsInAlbum, playSong, setAlbum, setCurrentSongId} from '../store/actions'
import { useNavigate } from 'react-router-dom'
import {Button} from '../../src/components'
import icons from '../utils/icons'

const {MdArrowBackIos, MdArrowForwardIos} = icons

var intervalId
const Slider = () => {
    const {banner} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [step, setStep] = useState(1)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(2)

    const [isAuto, setIsAuto] = useState(true)

    const handleAnimation = (step) => {
      console.log({min,max})
      const sliderEls = document.getElementsByClassName('slider-item')
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
        if(step === 1) {
          setMin(prev => prev === sliderEls.length - 1 ? 0 : prev + 1)
          setMax(prev => prev === sliderEls.length - 1 ? 0 : prev + 1)
        }

        if(step === -1){
          setMin(prev => prev === 0 ? sliderEls.length - 1 : prev - 1)
          setMax(prev => prev === 0 ? sliderEls.length - 1 : prev - 1)
        }
     }
    

    useEffect(() => {
      if(isAuto){
        intervalId = setInterval(() => {
          handleAnimation(1)
        }, 3000);
      }
      return () => { 
        intervalId && clearInterval(intervalId)
       }
    }, [min, max, isAuto])


    

    const handleClickBanner = (el) => {
      if(el?.type === 1){
        dispatch(getSongsInAlbum(null))
        dispatch(setCurrentSongId(el?.encodeId))
        dispatch(playSong(true))
      }
      else if(el?.type === 4){
        const path = el?.link?.split('.')[0]
        navigate(path)
      }
      else{
        dispatch(getSongsInAlbum(null))
      }
    }
    
  const handleBlack = useCallback(() => { 
    intervalId && clearInterval(intervalId)
    setIsAuto(false)
    handleAnimation(-1)
   }, [min, max])

  const handleForward = useCallback(() => { 
    intervalId && clearInterval(intervalId)
    setIsAuto(false)
    handleAnimation(1)
   }, [min, max])
  return (
    <div className='w-full overflow-hidden px-[59px] relative'>
      <Button 
        style={'absolute z-50 top-1/2 left-[70px] bg-[rgba(255,255,255,0.3)] text-white p-2 rounded-full text-center'}
        icon={<MdArrowBackIos size={30}/>}
        handleOnClick = {handleBlack}
      />
      <div 
        onMouseLeave={(e)=> setIsAuto(true)}
        className='flex w-full gap-8 pt-8'>
        {banner?.map((el,index) => (
            <img 
              onClick={()=>handleClickBanner(el)}
              key={el?.encodeId} 
              src={el?.banner} 
              className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <=2 ? 'block' : 'hidden'}`}
              />
        ))}
      </div>
      <Button 
        style={'absolute z-50 top-1/2 right-[70px] bg-[rgba(255,255,255,0.3)] text-white p-2 rounded-full text-center'}
        icon={<MdArrowForwardIos size={30}/>}
        handleOnClick = {handleForward}
      />
    </div>
  )
}

export default Slider