import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useGoogleMap } from '@react-google-maps/api'

export default function Markers({ positions }) {
  return (
    <Marker
      position={{
        lat: 37.772,
        lng: -122.214,
      }}
    />
  )
}
