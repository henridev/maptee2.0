import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import Map from '../maps/Map'
import MeetupForm from '../sub_components/MeetupForm'

export default function UserWelcome(props) {
  const [showMeetupForm, setshowMeetupForm] = useState(false)
  const [state, setState] = useState({
    oldDeparture: null,
    oldSuggestion: null,
    suggestion: null,
    departure: null,
  })

  return (
    <div>
      {showMeetupForm && <MeetupForm />}
      <UserHomeNavigator
        setshowMeetupForm={setshowMeetupForm}
        showMeetupForm={showMeetupForm}
      >
        <Map />
      </UserHomeNavigator>
    </div>
  )
}
