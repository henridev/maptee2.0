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
        className={props.className ? props.className : 'standard_searchbox'}
      />
    </StandaloneSearchBox>
  )
}
