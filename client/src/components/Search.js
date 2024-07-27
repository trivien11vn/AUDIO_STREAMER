import React, { useState, useEffect} from 'react'
import icons from '../utils/icons'
import {apiSearch} from '../apis'

const {FiSearch} = icons

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = async(e) => {
    if(e?.keyCode === 13){
      console.log(keyword)
      const response = await apiSearch(keyword)
      console.log(response)
    }
  }
  // useEffect(() => {
  //   window.addEventListener('keyup', handleSearch)
  //   // return () => {
  //   //   window.removeEventListener('keyup', handleSearch)
  //   // }
  // }, []);
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