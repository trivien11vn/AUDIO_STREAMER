import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { apiGetDetailSong, apiGetInfoSong } from '../apis';
import icons from '../utils/icons';
import { playSong, setCurrentSongData, setCurrentSongId } from '../store/actions';
import moment from 'moment';
import {toast} from 'react-toastify'
import {LoadingSong} from './'

const {GoHeart, GoHeartFill, TbDots, MdSkipNext, MdSkipPrevious, CiRepeat, CiShuffle, FaPlay, FaPause, LuRepeat, LuRepeat1, LuShuffle, BsMusicNoteList, SlVolumeOff, SlVolume1, SlVolume2} = icons
const Player = ({setIsDisplay}) => {
    var intervalId 
    const dispatch = useDispatch()
    const [audio, setAudio] = useState(new Audio())
    const {currentSongId, isPlay, album} = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [start, setStart] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isNextSong, setIsNextSong] = useState(0)
    const [isLoaded, setIsLoaded] = useState(true)
    const [volume, setVolume] = useState(100)
    
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
      const fetchSong = async() => {
        setIsLoaded(false)
        const [res1, res2] = await Promise.all([
          apiGetInfoSong(currentSongId),
          apiGetDetailSong(currentSongId),
        ])
        setIsLoaded(true)
        if(res1?.data?.err === 0){
          setSongInfo(res1?.data?.data)
          dispatch(setCurrentSongData(res1?.data?.data))
          setStart(0)
        }
        if(res2?.data?.err === 0){
          audio.pause()
          setAudio(new Audio(res2?.data?.data['128']))
        }
        else{
            audio.pause()
            dispatch(playSong(false))
            setAudio(new Audio())
            toast.warn(res2?.data?.msg)
            setStart(0)
            thumbRef.current.style.cssText = `right: 100%`
        }
      }
      fetchSong()
    }, [currentSongId]);

    useEffect(() => {
        audio.load()
        audio.currentTime = 0
        if(isPlay && thumbRef.current){
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setStart(Math.round(audio.currentTime))
            }, 200)
        }
        return () => clearInterval(intervalId);
    }, [audio]);

    useEffect(() => {
      const handleEnded = () => {
        if(isShuffle){
          handleSuffle()
        }
        else if (isNextSong){
          isNextSong === 1 ? handleRepeatSong() : handleNextSong()
        }
        else{
          audio.pause()
          dispatch(playSong(false))
        }
      }
      audio.addEventListener('ended', handleEnded)
      return () => {
        audio.removeEventListener('ended', handleEnded)
      }
    }, [audio, isNextSong, isShuffle])
    

    const handleRepeatSong = () => {
      audio.play()
    }
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
    
    const handleProgressBar = (e) => {
        const trackRect = trackRef?.current?.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000/trackRect.width ) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration /100
        setStart(Math.round(audio.currentTime))
    }

  const handleNextSong = () => {
    if(album){
      let currentIndex
      album?.forEach((item, index) => {
        if(item?.encodeId === currentSongId){
          currentIndex = index
        }
      })
      if(currentIndex === album?.length -1){
        dispatch(setCurrentSongId(album[0].encodeId))
      }
      else {
        dispatch(setCurrentSongId(album[currentIndex+1].encodeId))
      }
      dispatch(playSong(true))
    }
  }

  const handlePreviousSong = () => {
    if(album){
      let currentIndex
      album?.forEach((item, index) => {
        if(item?.encodeId === currentSongId){
          currentIndex = index
        }
      })
      if(currentIndex === 0){
        dispatch(setCurrentSongId(album[album.length - 1].encodeId))
      }
      else {
        dispatch(setCurrentSongId(album[currentIndex-1].encodeId))
      }
      dispatch(playSong(true))
    }
  }

  const handleSuffle = () => {
    const randomIndex = Math.ceil(Math.random() * album?.length) - 1
    dispatch(setCurrentSongId(album[randomIndex].encodeId))
    dispatch(playSong(true))
  } 

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume]);

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
            <span onClick={() =>{setIsNextSong(0); setIsShuffle(prev => !prev)}} className={`cursor-pointer ${isShuffle && 'text-green-600'}`} title='Bật phát ngẫu nhiên'><LuShuffle size={24}/></span>
            <span className={`${!album ? 'text-gray-500': 'cursor-pointer'}`} onClick={handlePreviousSong}><MdSkipPrevious size={24}/></span>
            <span 
              className='p-2 rounded-full border border-gray-700 hover:text-main-500 cursor-pointer'
              onClick={handlChangeState}>
              {!isLoaded ? <LoadingSong /> : isPlay ?  <FaPause size={16}/> : <FaPlay size={16}/>}
            </span>
            <span className={`${!album ? 'text-gray-500': 'cursor-pointer'}`} onClick={handleNextSong}><MdSkipNext size={24}/></span>
            <span 
              onClick={()=> {setIsShuffle(false); setIsNextSong(prev => {
                if(prev === 0 ){
                  return 2
                }
                else if(prev === 2){
                  return 1
                }
                else{
                  return 0
                }
              })}} 
              className={`cursor-pointer ${isNextSong !== 0 && 'text-green-600'}`} 
              title='Bật phát lại tất cả'>
                {
                  isNextSong === 1 ? <LuRepeat1 size={24}/> : <LuRepeat size={24}/>
                }
              </span>
          </div>
          <div className='w-full flex justify-around items-center text-xs'>
            <span>{moment.utc(start * 1000).format('mm:ss')}</span>
            <div
                ref={trackRef}
                onClick={handleProgressBar}
                className='w-4/5 h-[3px] hover:h-[8px] cursor-pointer bg-[rgba(0,0,0,0.1)] relative rounded-l-full rounded-r-full'>
               {/* thumbRef dai dien the div */}
              <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 bg-[#0e8080] rounded-l-full rounded-r-full'></div>
            </div>
            <span>{moment.utc(songInfo?.duration*1000).format('mm:ss')}</span>
          </div>
        </div>
        <div className='w-[30%] flex-auto flex items-center justify-end gap-4'>
          <div className='flex gap-2 items-center'>
            <span
              onClick={()=>setVolume(prev => +prev=== 0 ? 70 : 0)}>
              {+volume >=50 ? <SlVolume2 size={20}/> : +volume === 0 ? <SlVolumeOff size={20}/> : <SlVolume1 size={20}/>}
            </span>
            <input
              type='range'
              step={1}
              min={0}
              max={100} 
              value={volume}
              onChange={(e)=> setVolume(e.target.value)}
            />
          </div>
          <span 
            onClick={() => setIsDisplay(prev => !prev)}
            className='p-1 rounded-sm bg-main-500 opacity-90 hover:opacity-100 cursor-pointer'
          >
              <BsMusicNoteList size={20}/>
          </span>
        </div>
    </div>
  )
}
  
export default Player