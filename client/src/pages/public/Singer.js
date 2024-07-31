import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom' // /:id
import { apiGetArtist } from '../../apis/music';

const Singer = () => {
  const {singer} = useParams() 
  const [artistData, setArtistData] = useState(null)
  useEffect(() => {
    const fetchArtistData = async() => { 
      const response = await apiGetArtist(singer)
      if(response?.data?.err === 0){
        setArtistData(response?.data?.data)
      }
     }
    if(singer){
      fetchArtistData()
    }
  }, [singer]);
  return (
    <div className='flex flex-col w-full'>
      <div className='relative'>
      <img className='h-[400px] w-full object-cover' src={artistData?.cover} alt='background'></img>
      <div className='absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] text-white'>
        <div className='flex gap-8 items-center'>
          <h1 className='text-[60px] font-bold'>Name</h1>
          <span>play</span>
        </div>
        <span>Follower</span>
      </div>
      </div>
    </div>
  )
}

export default Singer