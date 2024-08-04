import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom' // /:id
import { apiGetArtist } from '../../apis/music';
import icons from '../../utils/icons';
import SongItem from '../../components/SongItem';
import { Artist, Section } from '../../components';

const {FaPlay, RiUserAddFill} = icons
const Singer = () => {
  const {singer} = useParams() 
  const positionRef = useRef()
  const [artistData, setArtistData] = useState(null)
  const [isHover, setIsHover] = useState(false)
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

  useEffect(() => {
    positionRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [singer]);

  console.log(artistData)
  console.log(artistData?.thumbnailM)
  return (
    <div className='flex flex-col w-full'>
      <div className='relative' ref={positionRef}>
      <img className='h-[400px] w-full object-cover' src={artistData?.thumbnailM} alt='background'></img>
      <div className='absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] text-white'>
        <div className='absolute bottom-0 pb-6'>
          <div className='flex gap-8 items-center'>
            <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
            <span 
              className='p-3 relative rounded-full bg-white text-main-500 hover:text-white cursor-pointer'
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className='w-4 h-4'></div>
              {isHover && 
              <span className='absolute top-[-1px] bottom-[-1px] left-[-1px] right-[-1px] animate-scale-up-center bg-main-500 rounded-full'></span>}
              <span className='absolute p-3 inset-0 z-50'> <FaPlay size={16}/></span>
            </span>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <span className='text-sm text-gray-300'>{`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
            <button
              type='button'
              className='text-white bg-main-500 px-4 py-2 rounded-l-full rounded-r-full flex items-center justify-center gap-1'>
              <RiUserAddFill size={15}/>
              <span className='text-xs opacity-90'>QUAN TÂM</span>
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className='mt-[30px] px-[60px] w-full flex'>
          <div className='w-[40%] flex-auto'>
            <h3 className='mb-5 font-bold text-[20px]'>Mới nhất</h3>
            <div className='flex gap-4 p-4 pr-11 bg-[#C4CDCC] rounded-md'>
              <img src={artistData?.topAlbum?.thumbnail} alt='thumbnail' className='w-[151px] h-[151px] object-cover rounded-md'></img>
              <div className='flex flex-col text-xs text-black opacity-80'>
                  <span>{artistData?.topAlbum?.textType}</span>
                  <div className='flex flex-col gap-[12px]'>
                    <span className='text-sm font-bold opacity-100'>{artistData?.topAlbum?.title}</span>
                    <span>{artistData?.topAlbum?.artistsNames}</span>
                  </div>
                  <span>{artistData?.topAlbum?.releaseDate}</span>
              </div>
            </div>  
          </div>
          <div className='w-[60%] flex-auto pl-6'>
            <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
            <div className='flex flex-wrap w-full justify-start'>
              {artistData?.sections?.find(item => item?.sectionType === 'song')?.items?.slice(0,6)?.map(el => (
                  <div 
                      className='w-[90%] min-[1024px]:w-[50%] '
                      key={el?.encodeId}>
                      <div className='w-[95%] border-b border-gray-400'>
                      <SongItem
                          thumbnail={el?.thumbnail}
                          title={el?.title}
                          artists={el?.artistsNames}
                          sid={el?.encodeId}              
                          size={'w-[60px] h-[60px]'}
                          />
                      </div>
                  </div>
              ))}
            </div>
          </div>
      </div>
      {artistData?.sections?.filter(item => item?.sectionType === 'playlist')?.map((el, index) => (
        <Section key={index} data={el}/>
      ))}

      <div className='flex flex-col w-full px-[60px] mt-12'>
        <h3 className='text-lg font-bold mb-5'>{artistData?.sections?.find(el => el?.sectionType === 'artist')?.title}</h3>
        <div className='flex items-center justify-start gap-[28px]'>
            {artistData?.sections?.find(el => el?.sectionType === 'artist')?.items?.slice(0,5)?.map(el=>(
                <Artist key={el?.id} data={el}/>
            ))}
        </div>
      </div>

      <div className='px-[60px] mt-12'>
        <h3 className='text-lg font-bold mb-5'>{`Về ${artistData?.name}`}</h3>
        <div className='flex gap-8'>
          <img src={artistData?.thumbnailM} alt='thumbnail' className='w-[45%] h-[350px] flex-none object-cover rounded-md'/>
          <div className='flex flex-col gap-8 text-sm'>
            <p dangerouslySetInnerHTML={{__html: artistData?.biography}}></p>
            <div className='flex flex-col gap-2'>
              <span className='text-[20px] font-bold'>{Number(artistData?.follow?.toFixed(1))?.toLocaleString()}</span>
              <span>Người quan tâm</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[500px]'>

      </div>
    </div>
  )
}

export default Singer