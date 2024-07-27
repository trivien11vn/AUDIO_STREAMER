import React, { useState, useEffect} from 'react'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import {useNavigate, createSearchParams} from 'react-router-dom'
import { search } from '../store/actions/music'
import path from '../utils/path'

const {FiSearch} = icons

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const handleSearch = async(e) => {
    if(e?.keyCode === 13){
      dispatch(search(keyword))
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString()
      })
    }
  }

  return (
    <div className='w-full flex items-center'>
        <span className='h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px] text-gray-500'>
          <FiSearch size={24} />
        </span>
        <input 
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleSearch}
            className='bg-[#DDE4E4] outline-none px-4 py-2 rounded-r-[20px] h-[40px] w-full text-gray-500'
            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        />
    </div>
  )
}

export default Search