import React, {useEffect} from 'react'
import { Slider, Section, NewRelease, ChartMusic} from '../../components'
import { getHome } from '../../apis'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const {chill, season, mood, top100, albumHot, weekChart} = useSelector(state => state.app)
  
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
      {chill && <Section data={chill}/>}
      <NewRelease />
      {season && <Section data={season}/>}
      {mood && <Section data={mood}/>}
      {top100 && <Section data={top100}/>}
      <ChartMusic />
      {weekChart &&
        <div className='flex items-center px-[43px] w-full mt-12'>
        {weekChart?.map(item => (
          <Link to={item?.link?.split('.')[0]} key={item?.link} className='flex-1 px-4'>
            <img src={item?.cover} alt='cover' className='w-full object-contain rounded-md'/>
          </Link>
        ))}
        </div>
      }
      {albumHot && <Section data={albumHot}/>}
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home