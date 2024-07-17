import React from 'react'
import icons from '../utils/icons'
import Search from './Search'
const {FaLongArrowAltLeft, FaLongArrowAltRight} = icons
const Header = () => {
  return (
    <div className='flex justify-between w-full items-center'>
        <div className='flex gap-6 w-full items-center'>
            <div className='flex gap-6 text-gray-400'>
                <span><FaLongArrowAltLeft size={24}/></span>
                <span><FaLongArrowAltRight size={24}/></span>
            </div>
            <div className='w-1/2'>
                <Search />
            </div>
        </div>
        <div>login</div>
    </div>
  )
}

export default Header