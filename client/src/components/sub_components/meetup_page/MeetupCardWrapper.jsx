import React, { useState } from 'react'
import MeetupCard from './MeetupCard'
import { store } from '../../../redux/_store'

export default function MeetupList(props) {
  const [meetups, setmeetups] = useState(store.getState().meetups)
  console.log(meetups)
  if (!meetups) {
    return <div>add some meetups</div>
  }
  return (
    <div className="meetup_card_wrapper">
      {meetups.map((meetup, i) => {
        return <MeetupCard key={i} meetup={meetup} />
      })}
    </div>
  )
}
