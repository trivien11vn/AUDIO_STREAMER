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
      <img className='mt-[-70px]' src={artistData?.cover} alt='background'></img>
    </div>
  )
}

export default Singer