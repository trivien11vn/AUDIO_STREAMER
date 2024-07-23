import React, { memo } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingSong = () => {
  return (
    <RotatingLines
        visible={true}
        height="16"
        width="16"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
  )
}

export default memo(LoadingSong)