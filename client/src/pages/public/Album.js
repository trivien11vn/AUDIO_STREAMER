import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {apiGetDetailPlaylist} from '../../apis'
import moment from 'moment';
import { ListSong } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Album = () => {
  const {plid} = useParams()
  const [playlist, setPlaylist] = useState(null)
  useEffect(() => {
    const fetchDetailPlaylist = async() => {
      const response = await apiGetDetailPlaylist(plid)
      if(response?.data?.err === 0){
        setPlaylist(response?.data?.data)
      }
    }
    fetchDetailPlaylist()
  }, [plid]);
  return (
      <div className='flex gap-8 w-full h-full px-[59px]'>
        <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
          <img src={playlist?.thumbnailM} alt='thumbnail' className='w-full object-contain rounded-md shadow-md'></img>
          <div className='flex flex-col gap-1 items-center'>
            <h3 className='text-[20px] font-bold text-center text-gray-800'>{playlist?.title}</h3>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>
              <span>Cập nhật: </span>
              <span>{moment.unix(playlist?.contentLastUpdate).format('DD/MM/YYYY')}</span>
            </span>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>
              {playlist?.artistsNames}
            </span>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>
              {`${Math.round(playlist?.like / 1000)}K người yêu thích`}
            </span>
          </div>
        </div>
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <div className='flex-auto mb-40'>
            <span className='text-sm'>
              <span className='text-gray-600'>Lời tựa: </span>
              <span>{playlist?.sortDescription}</span>
            </span>
            <div>
              <ListSong song={playlist?.song?.items} totalDuration = {playlist?.song?.totalDuration}/>
            </div>
          </div>
        </Scrollbars>
      </div>
  )
}

export default Album