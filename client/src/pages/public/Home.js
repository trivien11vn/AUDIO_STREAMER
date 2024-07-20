import React, {useEffect} from 'react'
import { Header, Slider} from '../../components'
import { getHome } from '../../apis'

const Home = () => {
  
  
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
    </div>
  )
}

export default Home