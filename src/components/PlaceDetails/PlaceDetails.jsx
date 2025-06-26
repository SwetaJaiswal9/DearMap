import React from 'react'

const PlaceDetails = ({place}) => {
  return (
    <div>{place?.name || "No name available"}</div>
  )
}

export default PlaceDetails