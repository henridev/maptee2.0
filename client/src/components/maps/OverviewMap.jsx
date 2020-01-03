import React, { useState, useEffect } from 'react'
import { getCurrentLocation } from '../../utils/GeoFunctions'
import {
  GoogleMap,
  useLoadScript,
  useGoogleMap,
  Marker,
} from '@react-google-maps/api'
import MeetupMarkers from './MeetupMarkers'
import Polygons from './Polygon'
import { store } from '../../redux/_store'
import { set_meetups } from '../../redux/_actions'

const GOOGLE_MAP_API_KEY = 'AIzaSyC4eD0NjYalr1zMt-mbfb7nEPiC39-xAOo'
export default function OverviewMap(props) {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const [meetups, setmeetups] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places'],
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
    >
      <MeetupMarkers setmeetups={setmeetups} />
    </GoogleMap>
  ) : null
}
