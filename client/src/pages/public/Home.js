import React, {useEffect} from 'react'
import { Slider, Section} from '../../components'
import { getHome } from '../../apis'

const Home = () => {
  
  
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
      <Section />
    </div>
  )
}

export default Home