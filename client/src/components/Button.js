import React, { memo } from 'react'
import clsx from 'clsx'
const Button = ({text, style, icon, handleOnClick}) => {
  return (
    <button
        onClick={handleOnClick}
        type='button'
        className={clsx(style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent')}
    >
        {text && <span>{text}</span>}
        {icon && <span>{icon}</span>}
    </button>
  )
}

export default memo(Button)