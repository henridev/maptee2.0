import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import Map from '../maps/Map'
import MeetupForm from '../sub_components/MeetupForm'
import { store, startState } from '../../redux/_store'
import { set_user, set_meetups } from '../../redux/_actions'

export default function UserWelcome(props) {
  useEffect(() => {
    const user_ = store.getState().user
    store.dispatch(set_meetups(user_._meetups))
    console.log(store.getState().meetups, 'new state')
  }, [])

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
        history={props.history}
        setshowMeetupForm={setshowMeetupForm}
        showMeetupForm={showMeetupForm}
      >
        <Map />
      </UserHomeNavigator>
    </div>
  )
}
