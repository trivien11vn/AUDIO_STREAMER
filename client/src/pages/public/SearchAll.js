import React from 'react'
import {useSelector} from 'react-redux'
import clsx from 'clsx'
import {handleRound} from '../../utils/fn'

const SearchAll = () => {
  const {searchData} = useSelector(state => state.music)
  console.log(searchData)
  return (
    <div className='w-full flex flex-col px-[60px]'>
      <div className='flex flex-col'>
        <h1 className='text-lg font-bold mb-5'>Nổi bật</h1>
        <div className='flex gap-8'>
          {searchData?.top && 
          <div className='p-[10px] bg-main-200 rounded-md flex gap-8 items-center flex-1'>
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
          <div className='flex-1'>aaa</div>
          <div className='flex-1'>bbb</div>
        </div>
      </div>
    </div>
  )
}

export default SearchAll