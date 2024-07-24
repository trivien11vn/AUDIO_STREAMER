import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {apiGetDetailPlaylist} from '../../apis'
import moment from 'moment';
import { AudioSpinner, ListSong } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { getSongsInAlbum, playSong, setCurrentSongId, setLoading } from '../../store/actions';
import clsx from 'clsx';
import icons from '../../utils/icons';

const Album = () => {
  const {FaPlay} = icons
  const {isPlay} = useSelector(state => state.music)
  const {plid} = useParams()
  const [playlist, setPlaylist] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()
  console.log(location)

  useEffect(() => {
    if(location?.state?.playAlbum){
      const randomSongIndex = Math.ceil(Math.random() * playlist?.song?.items?.length) - 1
      dispatch(setCurrentSongId(playlist?.song?.items[randomSongIndex]?.encodeId))
      dispatch(playSong(true))
    }
  }, [playlist, plid]);

  useEffect(() => {
    const fetchDetailPlaylist = async() => {
      dispatch(setLoading(true))
      const response = await apiGetDetailPlaylist(plid)
      dispatch(setLoading(false))

      if(response?.data?.err === 0){
        setPlaylist(response?.data?.data)
        dispatch(getSongsInAlbum(response?.data?.data?.song?.items))
      }
    }
    fetchDetailPlaylist()
  }, [plid]);
  return (
      <div className='flex gap-8 w-full h-full px-[59px] relative animate-scale-up-center'>
        <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
          <div className='w-full relative overflow-hidden'>
            <img 
              src={playlist?.thumbnailM} 
              alt='thumbnail' 
              className={clsx('w-full object-contain shadow-md', isPlay ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause')}
            />
            <div className={clsx('absolute inset-0 hover:bg-overlay-30 cursor-pointer text-white flex items-center justify-center', isPlay && 'hover:rounded-full')}>
              <span className='border border-white rounded-full p-3'>
                {isPlay ? <AudioSpinner /> : <FaPlay size={30}/>}
              </span>
            </div>
          </div>
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
              <ListSong totalDuration = {playlist?.song?.totalDuration}/>
            </div>
          </div>
        </Scrollbars>
      </div>
  )
}

export default Album