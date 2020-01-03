import React, { useState, useEffect } from 'react'
import { Marker, MarkerClusterer } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { set_meetups } from '../../redux/_actions'

export default function MeetupMarkers({ positions }) {
  const meetups = store.getState().meetups
  const sumLat = (accumulator, departure) =>
    departure._location.coordinates[0] + accumulator
  const sumLng = (accumulator, departure) =>
    departure._location.coordinates[1] + accumulator
  const renderMarker = clusterer => {
    return meetups.map((meetup, i) => {
      const lat_avg_sum =
        meetup._departure_locations.reduce(sumLat, 0) /
        meetup._departure_locations.length
      const lng_avg_sum =
        meetup._departure_locations.reduce(sumLng, 0) /
        meetup._departure_locations.length
      const lat = meetup._departure_locations[0]._location.coordinates[0]
      const lng = meetup._departure_locations[0]._location.coordinates[1]

      console.log(lat_avg_sum, lat)
      return (
        <Marker
          key={i}
          position={{
            lat: lat_avg_sum,
            lng: lng_avg_sum,
          }}
          clusterer={clusterer}
        />
      )
    })
  }

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  }

  const renderDepartureMarkers = clusterer => {
    return meetups.map((meetup, i) => {
      return (
        <MarkerClusterer options={options}>
          {clusterer =>
            meetup._departure_locations.map((dep, i) => {
              console.log(dep, '----')
              const lat = dep._location.coordinates[0]
              const lng = dep._location.coordinates[1]
              return (
                <Marker key={i} position={{ lat, lng }} clusterer={clusterer} />
              )
            })
          }
        </MarkerClusterer>
      )
    })
  }

  return renderDepartureMarkers()
}
