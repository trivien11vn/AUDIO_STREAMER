import React, {useEffect, useState} from 'react'
import { apiGetArtist } from '../../apis'
import { useSelector } from 'react-redux'
import { Section, SectionItem } from '../../components'

const SearchAlbum = () => {
  const {searchData} = useSelector(state => state.music)
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    const fetch = async() => {
      const res = await apiGetArtist(searchData?.top?.alias)
      console.log(res)
      if(res?.data?.err === 0){
        setPlaylist(res?.data?.data?.sections[1])
      }
    }
    fetch()
  }, [searchData]);
  return (
    <div className='w-full flex flex-col gap-8 px-[44px]'>
      <h3>Playlist/Album</h3>
      <div className='flex flex-wrap items-center justify-start'>
        {playlist?.items?.map(el=>(
            <SectionItem key={el?.encodeId} data={el} dataa={playlist}/>
        ))}
      </div>
    </div>
  )
}

export default SearchAlbum