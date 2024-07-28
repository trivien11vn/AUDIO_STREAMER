import React, { memo, useState, useEffect} from 'react'
import icons from '../utils/icons'
import clsx from 'clsx'
import { useSelector } from 'react-redux';
import {SongItem} from './';
import { apiGetDetailPlaylist } from '../apis';
import { Scrollbars } from 'react-custom-scrollbars-2';

const RightSidebar = () => {
  const  {FaRegTrashCan} = icons
  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState(null)
  const {currentSongId,currentSongData, currentAlbumId, isPlay, recentSongs} = useSelector(state => state.music)

  const fetchDetailPlaylist = async() => { 
    const response = await apiGetDetailPlaylist(currentAlbumId)
    if(response?.data?.err === 0) {
      setPlaylist(response?.data?.data?.song?.items)
    }
   }
  
  useEffect(() => {
    currentAlbumId && fetchDetailPlaylist()
  }, []);

  useEffect(() => {
     if(currentAlbumId && isPlay){
      fetchDetailPlaylist()
     }
  }, [currentAlbumId, isPlay])

  useEffect(() => {
    if(isPlay) setIsRecent(false)
  }, [currentSongId]);
  
  return (
    <div className='flex flex-col text-xs w-full h-full'>
      <div className='h-[70px] py-[14px] px-2 flex-none flex items-center gap-8'>
        <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-1 cursor-pointer'>
          <span onClick={()=>setIsRecent(false)} className={clsx('py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full', !isRecent && 'bg-main-100 text-main-500 font-semibold')}>Danh sách phát</span>
          <span onClick={()=>setIsRecent(true)} className={clsx('py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full', isRecent && 'bg-main-100 text-main-500 font-semibold')}>Nghe gần đây</span>
        </div>
        <span className='p-1 rounded-full hover:bg-main-500 hover:text-white cursor-pointer'>
          <FaRegTrashCan size={14}/>
        </span>
      </div>
      {isRecent ? 
        <div className='w-full flex flex-col px-2 h-full mb-[100px]'>
        <Scrollbars style={{ width: '100%', height: '100%'}}>
              {recentSongs && recentSongs?.map(el => (
                <SongItem 
                  key={el?.sid}
                  thumbnail={el?.thumbnail}
                  title={el?.title}
                  artists={el?.artists}
                  sid={el?.sid}
                />
              ))}
            </Scrollbars>
        </div>
        :
        <div className='w-full flex flex-col px-2 h-full'>
          <div >
          <SongItem 
            thumbnail={currentSongData?.thumbnail}
            title={currentSongData?.title}
            artists={currentSongData?.artistsNames}
            sid={currentSongData?.encodeId}
            style='bg-main-500 text-white'
          />
          </div>
          <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
            <span className='text-sm font-bold'>Tiếp theo</span>
            <span className='opacity-70 text-xs flex gap-1 line-clamp-1'>
              <span>Từ playlist</span>
              <span className='font-semibold text-main-500'>{currentSongData?.album?.title}</span>
            </span>
          </div>
          <div className='flex flex-col flex-grow mb-[100px]'>
            <Scrollbars style={{ width: '100%', height: '100%'}}>
              {playlist && playlist?.map(el => (
                <SongItem 
                  key={el?.encodeId}
                  thumbnail={el?.thumbnail}
                  title={el?.title}
                  artists={el?.artistsNames}
                  sid={el?.encodeId}
                />
              ))}
            </Scrollbars>
          </div>  
        </div>
      }
    </div>
  )
}

export default memo(RightSidebar)