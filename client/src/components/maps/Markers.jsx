import React, { useState, useEffect } from 'react'
import { Marker } from '@react-google-maps/api'
import { store, startState } from '../../redux/_store'
import { set_meetups } from '../../redux/_actions'

const sumCallbackFunction = function(accumulator, departure) {
  // For each element, create a new sum which is the previous sum + the current element
  const newSum = departure._location.coordinates[0] + accumulator
  // Return the new sum for the next element
  return newSum
}

export default function Markers({ positions }) {
  const meetups = store.getState().meetups
  const [markers] = useState(meetups.map(meetup => {}))

  const renderMarker = () => {
    return meetups.map(meetup => {
      const lat_avg_sum =
        meetup._departure_locations.reduce(sumCallbackFunction, 0) /
        meetup._departure_locations.length
      // const lng_avg_sum =
      //   meetup._departure_locations.reduce((a, b) => a[1] + b[1], 0) /
      //   meetup._departure_locations.length
      const lat = meetup._departure_locations[0]._location.coordinates[0]
      const lng = meetup._departure_locations[0]._location.coordinates[1]

      console.log(lat_avg_sum, lat)
      return (
        <Marker
          position={{
            lat_avg_sum,
            lng,
          }}
        />
      )
    })
  }

  return renderMarker()
}
