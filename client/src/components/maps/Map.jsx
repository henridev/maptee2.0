import React, { useState, useEffect } from 'react'
import { getCurrentLocation } from '../../utils/GeoFunctions'
import {
  GoogleMap,
  useLoadScript,
  useGoogleMap,
  Marker,
} from '@react-google-maps/api'

export default function MapComponent(props) {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const GOOGLE_MAP_API_KEY = 'AIzaSyC4eD0NjYalr1zMt-mbfb7nEPiC39-xAOo'
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  })

  const onMapLoad = map => {
    console.log(map)
  }
  const onClick = (...args) => {
    console.log(
      'onClick args: ',
      args[0].latLng.lat(),
      ' : ',
      args[0].latLng.lng()
    )
  }

  useEffect(() => {
    getCurrentLocation(setPosition)
  }, [])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      id="circle-example"
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      zoom={7}
      center={position}
      onLoad={onMapLoad}
      onClick={onClick}
    ></GoogleMap>
  ) : null
}
