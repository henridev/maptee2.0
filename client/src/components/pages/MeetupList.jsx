import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'

export default function MeetupList(props) {
  const [state, setState] = useState({ secret: null, message: null })
  const [showMeetupForm, setshowMeetupForm] = useState(false)
  useEffect(() => {}, [])
  return (
    <div className="Secret">
      <UserHomeNavigator
        activeIndex={1}
        history={props.history}
        setshowMeetupForm={setshowMeetupForm}
        showMeetupForm={showMeetupForm}
      ></UserHomeNavigator>
    </div>
  )
}
