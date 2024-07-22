import React, { memo } from 'react'
import icons from '../utils/icons'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { playSong, setAlbum, setCurrentSongId } from '../store/actions';

const {FaMusic} = icons
const ListItem = ({songData}) => {
  const dispatch = useDispatch()

  return (
    <div 
      onClick={() => {
          dispatch(setCurrentSongId(songData?.encodeId)); 
          dispatch(playSong(true));
          dispatch(setAlbum(true))
          }}
      className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'>
        <div className='flex items-center gap-3 flex-1'>
            <span><FaMusic /></span>
            <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover border rounded-md'></img>
            <span className='flex flex-col w-full'>
                <span className='text-sm font-semibold line-clamp-1'>{songData?.title}</span>
                <span className='text-xs line-clamp-1'>{songData?.artistsNames}</span>
            </span>
        </div>
        <div className='flex-1 flex justify-center line-clamp-1'>
          {songData?.album?.title}
        </div>
        <div className='flex-1 flex justify-end'>
        {moment.utc(songData?.duration*1000).format('mm:ss')}
        </div>
    </div>
  )
}

export default memo(ListItem)