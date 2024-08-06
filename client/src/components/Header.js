import React from 'react'
import icons from '../utils/icons'
import Search from './Search'
import { useNavigate, useParams} from 'react-router-dom'
import clsx from 'clsx'

const {FaLongArrowAltLeft, FaLongArrowAltRight} = icons
const Header = () => {
  const navigate = useNavigate()
  const {singer} = useParams()
  return (
    <div className='flex justify-between w-full items-center'>
        <div className='flex gap-6 w-full items-center'>
            <div className={clsx('flex gap-6 cursor-pointer', singer ? 'text-gray-200': 'text-gray-400')}>
                <span onClick={() => navigate(-1)}><FaLongArrowAltLeft size={24}/></span>
                <span onClick={() => navigate(+1)}><FaLongArrowAltRight size={24}/></span>
            </div>
            <div className='w-1/2'>
                <Search />
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Header