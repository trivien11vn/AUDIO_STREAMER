import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { apiGetChartHome } from '../../apis';
import bgChart from '../../assets/week-chart.jpg'
import { RankList } from '../../components';

const notActiveStyle = 'text-[24px] text-black font-semibold py-[12px] uppercase'
const activeStyle = 'text-[24px] text-main-500 font-semibold py-[12px] uppercase border-b-4 border-main-500'

const WeekRank = ({weekChart}) => {
  const {plid} = useParams()
  useEffect(() => {
    
  }, [plid]);
  return (
    <div className=''>
      <div className='relative'>
        <img src={bgChart} alt='bgChart' className='w-full h-[500px] object-cover grayscale'/>
        <div className='absolute inset-0 bg-[rgba(206,217,217,0.8)]'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
        <div className='absolute top-0 bottom-1/2 left-0 right-0 mt-[90px] px-[60px] flex flex-col gap-4'>
          <h3 className='font-bold text-[40px] text-main-500 capitalize'>Bảng xếp hạng tuần</h3>
          <div className='flex gap-8'>
            {
              weekChart?.map(item => (
                <NavLink 
                  key={item?.chartId}
                  className={({isActive})=>{return isActive ? activeStyle : notActiveStyle}}
                  to={item?.link?.split('.')[0]}>
                    {item?.country === 'vn' ? 'Việt Nam': 
                    item?.country === 'us' ? 'US/UK':
                    item?.country === 'korea' ? 'K-Pop':
                    ''}
                </NavLink>
              ))
            }
          </div>
          <div className='pb-8 w-full'>
            <RankList
              data={weekChart?.find(item => item?.link?.includes(plid))?.items}
              limitt={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekRank