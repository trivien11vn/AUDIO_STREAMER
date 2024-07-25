import React, { memo, useState, useEffect} from 'react'
import bgChart from '../assets/week-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'

const ChartMusic = () => {
  const [data, setData] = useState(null)
  const {chart, rank} = useSelector(state => state.app)

  const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: {display:false},
        grid: {borderDash: [4,20], color: 'rgba(255,255,255,0.5)'}
      },
      x: {
        ticks: {color: 'white'},
        grid: {color: 'transparent'}
      }
    },
    plugins: {
      legend: false
    }
  }
  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(el => el.hour)
    const datasets = []
    if(chart?.items){
      for(let i = 0; i<3; i++){
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(el => el.counter),
          borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
          tension: 0.2,
          borderWidth: 2
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
    <div className='px-[59px] mt-12 relative'>
      <img src={bgChart} alt='bgChart' className='w-full object-contain rounded-md'/>
      <div className='absolute z-10 top-0 bottom-0 left-[59px] right-[59px] bg-[rgba(115,20,140,0.9)]'></div>
      <div className='absolute z-20 top-0 bottom-0 left-[59px] right-[59px] p-5'>
        <h3 className='text-2xl text-white font-bold'>#ZINGCHART</h3>
        <div className='flex gap-4 h-full'>
          <div className='flex-4'>rank</div>
          <div className='flex-6 h-full'>
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