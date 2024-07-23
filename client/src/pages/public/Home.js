import React, {useEffect} from 'react'
import { Slider, Section, NewRelease} from '../../components'
import { getHome } from '../../apis'
import { useSelector } from 'react-redux'

const Home = () => {
  const {chill, season, mood, top100, albumHot, weekChart} = useSelector(state => state.app)
  console.log(weekChart)
  
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
      <Section data={chill}/>
      <NewRelease />
      <Section data={season}/>
      <Section data={mood}/>
      <Section data={top100}/>
      
      <Section data={albumHot}/>
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home