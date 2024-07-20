import React from 'react'

const ListItem = ({songData}) => {

  return (
    <div>{songData?.title}</div>
  )
}

export default ListItem