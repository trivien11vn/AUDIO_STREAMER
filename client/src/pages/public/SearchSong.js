import React, { useEffect } from 'react'
import {ListItem, ListSong} from '../../components'
import { useSelector, useDispatch} from 'react-redux'
import { getPlaylistSearch } from '../../store/actions'
import Scrollbars from 'react-custom-scrollbars-2'

const SearchSong = () => {
  const dispatch = useDispatch()
  const {searchData} = useSelector(state => state.music)
  useEffect(() => {
    dispatch(getPlaylistSearch(searchData?.top?.id))
  }, [searchData]);
  return (
    <div className='w-full px-[60px]'>
       <ListSong isHideTime isHideNode/>
    </div>
  )
}

export default SearchSong