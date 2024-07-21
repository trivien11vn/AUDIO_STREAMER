import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { apiGetDetailSong, apiGetInfoSong } from '../apis';
import icons from '../utils/icons';
import { playSong } from '../store/actions';
import moment from 'moment';

const {GoHeart, GoHeartFill, TbDots, MdSkipNext, MdSkipPrevious, CiRepeat, CiShuffle, FaPlay, FaPause} = icons
const Player = () => {
    var intervalId 
    const dispatch = useDispatch()
    const [audio, setAudio] = useState(new Audio())
    const {currentSongId, isPlay} = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [start, setStart] = useState(0)
    
    const thumbRef = useRef()

    useEffect(() => {
      const fetchSong = async() => {
        const [res1, res2] = await Promise.all([
          apiGetInfoSong(currentSongId),
          apiGetDetailSong(currentSongId),
        ])
        if(res1?.data?.err === 0){
          setSongInfo(res1?.data?.data)
        }
        if(res2?.data?.err === 0){
          audio.pause()
          setAudio(new Audio(res2?.data?.data['128']))
        }
      }
      fetchSong()
    }, [currentSongId]);


    useEffect(() => {
      console.log(isPlay)
      if(isPlay){
        intervalId = setInterval(() => { 
          let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
          thumbRef.current.style.cssText = `right: ${100 - percent}%`
          setStart(Math.round(audio.currentTime))
        }, 200)
      }
      return () => clearInterval(intervalId);
    }, [isPlay])

    useEffect(() => {
      audio.load()
      if(isPlay){
        audio.play()
      }
    }, [audio]);
  
    
    const handlChangeState = async() => {
      if(isPlay){
        audio.pause()
        dispatch(playSong(false))
      }
      else{
        audio.play()
        dispatch(playSong(true))
      }
    }
    
  return (
    <div className='bg-main-400 px-5 h-full flex'>
        <div className='w-[30%] flex-auto flex gap-3 items-center'>
          <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover border rounded-md'/>
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-700 text-[14px]'>{songInfo?.title}</span>
            <span className='text-[12px] text-gray-500'>{songInfo?.artistsNames}</span>
          </div>
          <div className='flex gap-4 pl-2'>
            <span><GoHeart size={16}/></span>
            <span><TbDots size={16}/></span>
          </div>
        </div>
        <div className='w-[40%] flex-auto flex flex-col items-center justify-center gap-2 py-2'>
          <div className='flex gap-8 justify-center items-center'>
            <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><CiShuffle size={24}/></span>
            <span className='cursor-pointer'><MdSkipPrevious size={24}/></span>
            <span 
              className='p-2 rounded-full border border-gray-700 hover:text-main-500 cursor-pointer'
              onClick={handlChangeState}>
             {isPlay ?  <FaPause size={16}/> : <FaPlay size={16}/>}
            </span>
            <span className='cursor-pointer'><MdSkipNext size={24}/></span>
            <span className='cursor-pointer' title='Bật phát lại tất cả'><CiRepeat size={24}/></span>
          </div>
          <div className='w-full flex justify-around items-center text-xs'>
            <span>{moment.utc(start * 1000).format('mm:ss')}</span>
            <div className='w-4/5 h-[3px] bg-[rgba(0,0,0,0.1)] relative rounded-l-full rounded-r-full'>
               {/* thumbRef dai dien the div */}
              <div ref={thumbRef} className='absolute top-0 left-0 h-[3px] bg-[#0e8080] rounded-l-full rounded-r-full'></div>
            </div>
            <span>{moment.utc(songInfo?.duration*1000).format('mm:ss')}</span>
          </div>
        </div>
        <div className='w-[30%] flex-auto border border-red-500'>Volumn</div>
    </div>
  )
}
  
export default Player