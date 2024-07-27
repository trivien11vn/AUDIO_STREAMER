import React from 'react'
import { Outlet } from 'react-router-dom'

const Searchh = () => {
  return (
    <div>
      Search
      <div>
      <Outlet />
      </div>
    </div>
  )
}

export default Searchh