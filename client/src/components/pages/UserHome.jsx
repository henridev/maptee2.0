import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import Map from '../maps/OverviewMap'
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

  return (
    <div>
      {showMeetupForm && <MeetupForm />}
      <UserHomeNavigator
        activeIndex={0}
        history={props.history}
        setshowMeetupForm={setshowMeetupForm}
        showMeetupForm={showMeetupForm}
      >
        <Map />
      </UserHomeNavigator>
    </div>
  )
}
