import React, { useEffect, useRef, useState } from 'react'
import { apiGetChartHome } from '../../apis/music';
import bgChart from '../../assets/week-chart.jpg'
import { Line } from 'react-chartjs-2'
import { ListItem, ListSong, RankList, SongItem } from '../../components';
import _ from 'lodash'

const ZingChart = () => {
  const [chartData, setChartData] = useState(null)
  const [data, setData] = useState(null)
  const [limit, setLimit] = useState(10)
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
        grid: {color: 'rgba(0,0,0,0.3)', drawTicks: false},
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: {dash: [3,4]}
      },
      x: {
        ticks: {color: 'gray'},
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
              data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(el => el.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
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
    const fetchChartData = async() => { 
      const response = await apiGetChartHome()
      if(response.data.err === 0){
        setChartData(response.data.data)
      }
     }
    fetchChartData()
  }, []);

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(el => `${el.hour}:00`)
    const datasets = []
    if(chartData?.RTChart?.chart?.items){
      for(let i = 0; i<3; i++){
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(el => el.counter),
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
  }, [chartData]);

  console.log(chartData)
  return (
    <div className=''>
      <div className='flex flex-col'>
        <div className='relative'>
          <img src={bgChart} alt='bgChart' className='w-full h-[500px] object-cover grayscale'/>
          <div className='absolute inset-0 bg-[rgba(206,217,217,0.9)]'></div>
          <div className='absolute inset-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
          <div className='absolute top-0 bottom-1/2 left-0 right-0 mt-14 px-[60px]'>
            <h3 className='font-bold text-[40px] text-main-500'>#zingchart</h3>
          </div>
          <div className='absolute top-[35%] left-0 right-0 bottom-0 px-[60px]'>
            {data &&
              <Line 
                data={data}
                options={options}
                ref={chartRef}
              />
              }
              <div className='tooltip' style={{top:tooltipState?.top, left:tooltipState?.left, opacity:tooltipState?.opacity, position:'absolute'}}>
                <SongItem
                  thumbnail={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.thumbnail}
                  title={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.title}
                  artists={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.artistsNames}
                  sid={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.encodeId}
                  style={'bg-main-200'}
                />
              </div>
          </div>
        </div>
      </div>
      <div className='px-[60px] mt-12'>
        <RankList data={chartData?.RTChart?.items} limitt={10}/>
      </div>
      <div className='relative'>
        <img src={bgChart} alt='bgChart' className='w-full object-cover grayscale'/>
        <div className='absolute inset-0 bg-[rgba(206,217,217,0.9)]'></div>
        <div className='absolute top-0 bottom-1/2 left-0 right-0 mt-12 px-[60px] flex flex-col gap-8'>
          <h3 className='font-bold text-[40px] text-main-500'>Bảng xếp hạng tuần</h3>
          <div className='flex gap-4'>
            {
              Object?.entries(chartData?.weekChart)?.map((item, index) => (
                <div key={index} className='flex-1 bg-gray-200 rounded-md px-[10px] py-[20px]'>
                  <h3 className='text-[24px] text-main-500 font-bold'>
                    {item[0] === 'vn' ? 'Việt Nam': 
                    item[0] === 'us' ? 'US/UK':
                    item[0] === 'korea' ? 'K-Pop':
                    ''}
                  </h3>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart