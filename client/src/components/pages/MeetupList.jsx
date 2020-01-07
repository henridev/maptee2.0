import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import MeetupCard from '../sub_components/MeetupCard'
import { store } from '../../redux/_store'

export default function MeetupList(props) {
  const [state, setState] = useState({ secret: null, message: null })
  const [showMeetupForm, setshowMeetupForm] = useState(false)
  const [meetups, setmeetups] = useState(store.getState().meetups)

  return (
    <UserHomeNavigator
      activeIndex={1}
      history={props.history}
      setshowMeetupForm={setshowMeetupForm}
      showMeetupForm={showMeetupForm}
    >
      {!meetups && <div>add some meetups</div>}
      {meetups && (
        <div className="meetup_card_wrapper">
          {meetups.map((meetup, i) => {
            return <MeetupCard key={i} meetup={meetup} />
          })}
        </div>
      )}
    </UserHomeNavigator>
  )
}
