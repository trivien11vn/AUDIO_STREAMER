import React, { memo } from 'react'
import icons from '../utils/icons'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { playSong, setAlbum, setCurrentSongId, setRecentSongs } from '../store/actions';
import clsx from 'clsx';

const {FaMusic} = icons
const ListItem = ({songData, isHideAlbum, isHideNode, order}) => {
  const dispatch = useDispatch()

  return (
    <div 
      onClick={() => {
          dispatch(setCurrentSongId(songData?.encodeId)); 
          dispatch(playSong(true));
          dispatch(setAlbum(true));
          dispatch(setRecentSongs(
            {
              thumbnail: songData?.thumbnail, 
              title: songData?.title, 
              artists: songData?.artistsNames, 
              sid: songData?.encodeId
            }
          ))
          }}
      className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'>
        <div className='flex items-center gap-3 flex-1'>
            {order && <span className={clsx('flex justify-center items-center text-[32px] text-main-300 flex-none w-[12%]', order === 1 ? 'text-shadow-1': order ===2 ? 'text-shadow-2' : order === 3 ? 'text-shadow-3' : 'text-shadow-4')}>{order}</span>}
           {!isHideNode && <span><FaMusic /></span>}
            <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover border rounded-md'></img>
            <span className='flex flex-col w-full'>
                <span className='text-sm font-semibold line-clamp-1'>{songData?.title}</span>
                <span className='text-xs opacity-70 line-clamp-1'>{songData?.artistsNames}</span>
            </span>
        </div>
        {!isHideAlbum && <div className='flex-1 flex justify-center items-center line-clamp-1 text-xs'>
          {songData?.album?.title}
        </div>}
        <div className='flex-1 flex justify-end text-xs opacity-70'>
        {moment.utc(songData?.duration*1000).format('mm:ss')}
        </div>
    </div>
  )
}

export default memo(ListItem)