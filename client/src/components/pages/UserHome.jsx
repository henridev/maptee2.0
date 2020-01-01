import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import Map from '../maps/Map'
import { LoadScript } from '@react-google-maps/api'
import { getCurrentLocation } from '../../utils/GeoFunctions'

export default function UserWelcome(props) {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [state, setState] = useState({
    oldDeparture: null,
    oldSuggestion: null,
    suggestion: null,
    departure: null,
  })

  getCurrentLocation(setCurrentLocation)

  return (
    <div>
      <UserHomeNavigator>
        <Map currentLocation={currentLocation} />
      </UserHomeNavigator>
    </div>
  )
}
