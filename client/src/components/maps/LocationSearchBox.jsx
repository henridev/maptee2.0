import React, { useRef } from 'react'
import { StandaloneSearchBox, useLoadScript } from '@react-google-maps/api'

export default function LocationSearch(props) {
  const searchbox = useRef(null)
  const onLoad = ref => (searchbox.current = ref)
  const onPlacesChanged = () => {
    const places = searchbox.current.getPlaces()
    const lat = places[0].geometry.location.lat()
    const lng = places[0].geometry.location.lng()
    const g_id = places[0].id
    const g_name = places[0].formatted_address
    try {
      if (props.setNewLocation) {
        return props.setNewLocation({ lat, lng, g_id, g_name })
      }
      return props.set_departure_locations({ lat, lng, g_id, g_name })
    } catch {
      return props.set_suggested_locations({ lat, lng, g_id, g_name })
    }
  }

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <input
        type="text"
        placeholder={props.placeholder}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: 'absolute',
          left: '50%',
          marginLeft: '-120px',
          backgroundColor: props.backgroundColor,
          ...props.style,
        }}
      />
    </StandaloneSearchBox>
  )
}
