import React, { memo } from 'react'
import clsx from 'clsx'
const Button = ({text, style}) => {
  return (
    <button
        type='button'
        className={clsx(style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent')}
    >
        {text}
    </button>
  )
}

export default memo(Button)