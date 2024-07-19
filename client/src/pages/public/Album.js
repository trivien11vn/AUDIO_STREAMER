import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {apiGetDetailPlaylist} from '../../apis'
const Album = () => {
  const {title, plid} = useParams()
  useEffect(() => {
    const fetchDetailPlaylist = async() => {
      const response = await apiGetDetailPlaylist(plid)
      console.log(response)
    }
    fetchDetailPlaylist()
  }, [plid]);
  return (
    <div>Album</div>
  )
}

export default Album