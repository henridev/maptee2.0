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
