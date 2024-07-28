import React from 'react'
import {useSelector} from 'react-redux'
import clsx from 'clsx'
import {handleRound} from '../../utils/fn'
import {Artist, ListItem, Section, SectionItem, SongItem} from '../../components'

const SearchAll = () => {
  const {searchData} = useSelector(state => state.music)
  console.log(searchData)
  return (
    <div className='w-full flex flex-col px-[60px] gap-[60px]'>
      <div className='flex flex-col'>
        <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
        <div className='flex gap-8'>
          {searchData?.top && 
          <div className='p-[10px] bg-main-200 rounded-md flex gap-8 items-center flex-1 cursor-pointer'>
            <img src={searchData?.top?.thumbnail} alt='avatar' className={clsx('w-[84px] h-[84px] object-cover', searchData?.top?.objectType === 'artist' && 'rounded-full')}></img>
            <div className='flex flex-col text-xs'>
              <span className='mb-[6px]'>{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
              <span className='text-sm font-semibold'>{searchData?.top?.title || searchData?.top?.name}</span>
              {searchData?.top?.objectType === 'artist' && 
                <span>
                  {handleRound(searchData?.artists[0]?.totalFollow) + ' quan tâm'}
                </span>
              }
            </div>
          </div>}
          {searchData?.songs?.slice(0,2)?.map(item => (
            <div className='flex-1' key={item?.encodeId}>
            <SongItem 
              thumbnail={item?.thumbnail}
              sid={item?.encodeId}
              title={item?.title}
              artists={item?.artistsNames}
              size={'w-[84px] h-[84px]'}
              style={'bg-main-200'}
            />
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Bài hát</h3>
        <div className='flex flex-wrap justify-between w-full'>
          {searchData?.songs?.map((item, index) => (
            <div key={item?.encodeId} className={clsx('w-[45%] flex-auto', index % 2 === 0 ? 'pr-4' : 'pl-4')}>
              <ListItem songData={item} isHideAlbum/>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Playlist/Ablum</h3>
        <div className='flex items-center justify-between gap-[28px]'>
            {searchData?.playlists?.slice(0,5)?.map(el=>(
                <SectionItem key={el?.encodeId} data={el} dataa={searchData?.playlists}/>
            ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <h3 className='text-lg font-bold mb-5'>Nghệ sĩ</h3>
        <div className='flex items-center justify-start gap-[28px]'>
            {searchData?.artists?.slice(0,5)?.map(el=>(
                <Artist key={el?.id} data={el}/>
            ))}
        </div>
      </div>

      <div className='w-full h-[500px]'>

      </div>
    </div>
  )
}

export default SearchAll