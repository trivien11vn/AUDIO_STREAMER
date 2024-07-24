import React, {useEffect} from 'react'
import { Slider, Section, NewRelease} from '../../components'
import { getHome } from '../../apis'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <div className='flex items-center px-[43px] w-full mt-12'>
        {weekChart?.map(item => (
          <Link to={item?.link?.split('.')[0]} key={item?.link} className='flex-1 px-4'>
            <img src={item?.cover} alt='cover' className='w-full object-contain rounded-md'/>
          </Link>
        ))}
      </div>
      <Section data={albumHot}/>
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home