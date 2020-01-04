import React from 'react'
import { Marker } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { sumLat, sumLng } from '../../utils/GeoFunctions'

export default function MeetupMarkers({ selectedmeetup }) {
  const departurelocations = selectedmeetup._departure_locations
  console.log(selectedmeetup)
  return departurelocations.map((departure, i) => {
    const lat = departure._location.coordinates[0]
    const lng = departure._location.coordinates[1]
    return <Marker position={{ lat, lng }} key={i} />
  })
}
