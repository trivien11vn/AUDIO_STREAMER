import React, { memo } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import { playSong, setCurrentSongId } from '../store/actions';
import clsx from 'clsx';
const SongItem = ({thumbnail, title, artists, release, sid, order, percent}) => {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {dispatch(setCurrentSongId(sid)); dispatch(playSong(true));}}
      className={clsx('w-full flex-auto flex justify-between items-center gap-[10px] p-[10px] rounded-md cursor-pointer', order && 'text-white bg-[hsla(0,0%,100%,.07)]', order ? 'hover:bg-[#945EA7]' :'hover:bg-main-200')}>
      <div className='flex gap-4'>
        {order && <span className={clsx('m-auto text-[32px] text-white drop-shadow-md')}>{order}</span>}
        <img src={thumbnail} alt='thumbnail' className='w-[60px] h-[60px] object-cover rounded-md'/>
        <div className='flex flex-col gap-1 '>
          <span className='text-sm font-semibold line-clamp-1'>{title}</span>
          <span className={clsx('text-xs line-clamp-1', order ? 'opacity-70' : 'text-gray-700')}>{artists}</span>
          {release && <span className='text-xs text-gray-700 line-clamp-1'>{moment(release * 1000).fromNow()}</span>}
        </div>
      </div>
      {percent && <span>{percent}</span>}
    </div>
  )
}

export default memo(SongItem)