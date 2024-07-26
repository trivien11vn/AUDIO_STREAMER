import React, { memo, useState, useEffect, useRef} from 'react'
import bgChart from '../assets/week-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import {SongItem} from './'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import icons from '../utils/icons'
import path from '../utils/path'

const ChartMusic = () => {
  const {FaPlay} = icons
  const [data, setData] = useState(null)
  const {chart, rank} = useSelector(state => state.app)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0, //khong hien
    top: 0,
    left: 0,

  })//initial tooltip state

  const [selected, setSelected] = useState(null)

  const chartRef = useRef()
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
      legend: false,
      tooltip: {
        enabled: false,
        external: ({tooltip}) => {
          if(!chartRef || !chartRef.current) return
          if(tooltip?.opacity === 0){
            if(tooltipState?.opacity !== 0) setTooltipState(prev => ({...prev, opacity:0}))
            return
          }
          const dataCounter = []
          for (let i = 0; i < 3; i++){
            dataCounter?.push({
              data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(el => el.counter),
              encodeId: Object.keys(chart?.items)[i]
            })
          }
          const covertNum = +tooltip?.body[0]?.lines[0]?.replace('.','')
          const rs = dataCounter?.find(item => item?.data?.some(el => el === covertNum))?.encodeId
          setSelected(rs)
          const newTooltipData = {
            opacity: 1,
            top: tooltip.caretY,
            left: tooltip.caretX,
          }
          if(!_.isEqual(tooltipState, newTooltipData)){
            setTooltipState(newTooltipData)
          }
        }
      }
    },
    hover: {
      mode: 'dataset',
      intersect: false
    }
  }
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
      setData({
        labels, 
        datasets
      })
    }
  }, [chart]);
  console.log(selected)
  return (
    <div className='px-[59px] mt-12 relative max-h-[420px] rounded-md'>
      <img src={bgChart} alt='bgChart' className='w-full object-cover rounded-md max-h-[420px]'/>
      <div className='absolute z-10 top-0 bottom-0 left-[59px] right-[59px] bg-[rgba(115,20,140,0.9)] rounded-md'></div>
      <div className='absolute z-20 top-0 bottom-0 left-[59px] right-[59px] p-5 flex flex-col gap-8'>
        <Link className='flex text-white gap-2 items-center' to={path?.ZING_CHART}>
          <h3 className='text-2xl text-white font-bold hover:text-green-700'>#ZINGCHART</h3>
          <span className='p-2 border rounded-full text-green-700 bg-white'><FaPlay/></span>
        </Link>
        <div className='flex gap-4 h-full'>
          <div className='flex-3 flex flex-col gap-4 h-[90%]'>
            {rank?.slice(0,3)?.map((item, index) => 
              <SongItem 
                key={item?.encodeId}
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artistsNames}
                sid={item?.encodeId}
                order={index + 1}
                percent={`${Math.round(+item?.score * 100 / +chart?.totalScore)}%`}
                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]'
              />
            )}
            <Link to={path?.ZING_CHART} className='text-white px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit m-auto'>Xem thêm</Link>
          </div>
          <div className='flex-7 h-[80%] relative w-[75%]'>
            {data &&
              <Line 
                data={data}
                options={options}
                ref={chartRef}

              />
              }
              <div className='tooltip' style={{top:tooltipState?.top, left:tooltipState?.left, opacity:tooltipState?.opacity, position:'absolute'}}>
                <SongItem 
                  thumbnail={rank?.find(item => item?.encodeId === selected)?.thumbnail}
                  title={rank?.find(item => item?.encodeId === selected)?.title}
                  artists={rank?.find(item => item?.encodeId === selected)?.artistsNames}
                  sid={rank?.find(item => item?.encodeId === selected)?.encodeId}
                  style={'bg-main-200'}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartMusic)