import React, { useState, useEffect } from 'react'
import api from '../../apis/meetup_api'
import { getCurrentLocation } from '../../utils/GeoFunctions'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { set_meetups } from '../../redux/_actions'
import NearMeIcon from '@material-ui/icons/NearMe'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import AddIcon from '@material-ui/icons/Add'
import MeetupInfoWindows from './MeetupInfoWindows'
import LocationSearchBox from './LocationSearchBox'
import DepartureMeetupMarkers from './DepartureMeetupMarkers'
import SuggestionMeetupMarkers from './SuggestionMeetupMarkers'
import Button from '../sub_components/Button'
const libararies = ['places']
const GOOGLE_MAP_API_KEY = 'AIzaSyC4eD0NjYalr1zMt-mbfb7nEPiC39-xAOo'

export default function OverviewMap(props) {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const [meetups, setmeetups] = useState(null)
  const [isInput, setisInput] = useState(false)
  const [newLocation, setNewLocation] = useState(null)
  const [selectedmeetup, setselectedmeetup] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: libararies,
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

  const handleNewLocationClick = e => {
    if (isInput === 'departure') {
      api
        .addLocation(selectedmeetup._id, true, newLocation)
        .then(updatedMeetup => {
          let meetups = store.getState().meetups
          const update_index = meetups.findIndex(meetup => updatedMeetup)
          meetups[update_index] = updatedMeetup
          setselectedmeetup(updatedMeetup)
          store.dispatch(set_meetups(meetups))
        })
        .catch(err => console.error(err))
    } else {
      api
        .addLocation(selectedmeetup._id, false, newLocation)
        .then(updatedMeetup => {
          let meetups = store.getState().meetups
          const update_index = meetups.findIndex(meetup => updatedMeetup)
          meetups[update_index] = updatedMeetup
          setselectedmeetup(updatedMeetup)
          store.dispatch(set_meetups(meetups))
        })
        .catch(err => console.error(err))
    }
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
      {isInput && (
        <div className="input_location">
          <LocationSearchBox
            placeholder={isInput}
            setNewLocation={setNewLocation}
            className="searchbox_variant"
          />
          <Button icon={<AddIcon />} onClick={handleNewLocationClick} />
        </div>
      )}
      {selectedmeetup !== null && (
        <>
          <DepartureMeetupMarkers
            locations={selectedmeetup._departure_locations}
          />
          <SuggestionMeetupMarkers
            locations={selectedmeetup._suggested_locations}
          />
          <div className="map_buttons">
            <Button
              icon={<NearMeIcon />}
              onClick={() => setisInput(isInput ? false : 'departure')}
            >
              <span>departure</span>
            </Button>
            <Button
              icon={<MyLocationIcon />}
              onClick={() => setisInput(isInput ? false : 'suggestion')}
            >
              <span>suggestion</span>
            </Button>
          </div>
        </>
      )}
      {selectedmeetup === null && (
        <MeetupInfoWindows
          setmeetups={setmeetups}
          setselectedmeetup={setselectedmeetup}
        />
      )}
    </GoogleMap>
  ) : null
}
