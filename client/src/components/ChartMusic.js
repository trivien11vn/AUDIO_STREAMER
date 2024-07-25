import React, { memo, useState, useEffect} from 'react'
import bgChart from '../assets/week-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import {SongItem} from './'

const ChartMusic = () => {
  const [data, setData] = useState(null)
  const {chart, rank} = useSelector(state => state.app)

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {display:false},
        grid: {color: 'rgba(255,255,255,0.2)', drawTicks: false},
        min: chart?.minScore,
        max: chart?.maxScore,
        border: {dash: [3,4]}
      },
      x: {
        ticks: {color: 'white'},
        grid: {color: 'transparent'}
      }
    },
    plugins: {
      legend: false
    },
    hover: {
      mode: 'dataset',
      intersect: false
    }
  }
  console.log({chart, rank})
  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(el => `${el.hour}:00`)
    const datasets = []
    if(chart?.items){
      for(let i = 0; i<3; i++){
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(el => el.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 4,

        })
      }
      console.log({labels, datasets})
      setData({
        labels, 
        datasets
      })
    }
  }, [chart]);
  return (
    <div className='px-[59px] mt-12 relative max-h-[420px]'>
      <img src={bgChart} alt='bgChart' className='w-full object-cover rounded-md max-h-[420px]'/>
      <div className='absolute z-10 top-0 bottom-0 left-[59px] right-[59px] bg-[rgba(115,20,140,0.9)]'></div>
      <div className='absolute z-20 top-0 bottom-0 left-[59px] right-[59px] p-5 flex flex-col gap-8'>
        <h3 className='text-2xl text-white font-bold'>#ZINGCHART</h3>
        <div className='flex gap-4 h-full'>
          <div className='flex-3 flex flex-col gap-4'>
            {rank?.slice(0,3)?.map((item, index) => 
              <SongItem 
                key={item?.encodeId}
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artistsNames}
                sid={item?.encodeId}
                order={index + 1}
                percent={`${Math.round(+item?.score * 100 / +chart?.totalScore)}%`}
              />
            )}
          </div>
          <div className='flex-7 h-full'>
            {data &&
              <Line 
                data={data}
                options={options}
              />
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartMusic)