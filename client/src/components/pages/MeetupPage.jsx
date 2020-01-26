import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import MeetupCardWrapper from '../sub_components/meetup_page/MeetupCardWrapper'
import MeetupInviteDialog from '../sub_components/meetup_page/MeetupInviteDialog'

export default function MeetupList(props) {
  const [showMeetupForm, setshowMeetupForm] = useState(false)

  return (
    <UserHomeNavigator
      activeIndex={1}
      history={props.history}
      setshowMeetupForm={setshowMeetupForm}
      showMeetupForm={showMeetupForm}
    >
      <MeetupCardWrapper />
      <MeetupInviteDialog />
    </UserHomeNavigator>
  )
}
