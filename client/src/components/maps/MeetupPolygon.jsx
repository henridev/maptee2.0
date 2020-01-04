import React, { useState, useEffect } from 'react'
import { Polygon } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { set_meetups } from '../../redux/_actions'
const colors = ['red', 'blue', 'yellow']

export default function Polygons({ positions, setmeetups }) {
  const meetups = store.getState().meetups
  setmeetups(meetups)
  const departure_locations_arrays = meetups.map((meetup, i) => {
    return meetup._departure_locations
  })
  console.log(departure_locations_arrays)

  const options = {
    fillColor: 'lightblue',
    fillOpacity: 0.1,
    strokeColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  }
  const onLoad = polygon => {
    console.log('polygon: ', polygon)
  }

  const renderPolygon = () => {
    let paths_arr = []
    let names

    departure_locations_arrays.forEach(dep_loc => {
      console.log(dep_loc, '---')
      let paths = []
      dep_loc.forEach(loc => {
        const lat = loc._location.coordinates[0]
        const lng = loc._location.coordinates[1]
        paths.push({ lat, lng })
      })
      paths_arr.push(paths)
    })
    console.log(paths_arr)
    return paths_arr.map((paths, i) => (
      <Polygon
        key={i}
        onLoad={onLoad}
        paths={paths}
        options={{ ...options, strokeColor: colors[i] }}
      />
    ))
  }

  return renderPolygon()
}
