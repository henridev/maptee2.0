import React, { useEffect, useRef, useState } from 'react'

export default function Map() {
  const [googleMap, setgoogleMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const googleMapRef = useRef()
  const GOOGLE_MAP_API_KEY = 'AIzaSyC4eD0NjYalr1zMt-mbfb7nEPiC39-xAOo'
  useEffect(() => {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      setgoogleMap(createGoogleMap())
      setMarkers([...markers, createMarker()])
    })
  }, [])

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    })

  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: googleMap,
    })

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
