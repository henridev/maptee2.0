import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import SendRequestButton from '../sub_components/requests/SendRequestButton'
import ShowRequestsButton from '../sub_components/requests/ShowRequestsButton'

import FriendsList from '../sub_components/friendspage/FriendsList'
import { store } from '../../redux/_store'
import api from '../../apis/friends_api'

export default function FriendPage(props) {
  const [state, setState] = useState({ secret: null, message: null })
  const [showMeetupForm, setshowMeetupForm] = useState(false)
  const [friends, setFriends] = useState(store.getState().user._friends)
  const [msg, setMsg] = useState(null)

  const sendHandler = async email => {
    try {
      const res = await api.sendFriendRequest(email)
      console.log('request has been send')
      return true
    } catch (err) {
      console.error('request not send', err)
      return false
    }
  }

  return (
    <UserHomeNavigator
      activeIndex={3}
      history={props.history}
      setshowMeetupForm={setshowMeetupForm}
      showMeetupForm={showMeetupForm}
    >
      <div className="friendspage">
        <div className="request_btn_container">
          <SendRequestButton
            openbtn="send friend request"
            text="give in friends email to send him a request"
            title="Request"
            cancelbtn="cancel"
            sendbtn="send"
            className="send_friendrequest_container"
            sendHandler={sendHandler}
          />
          <ShowRequestsButton className="show_friendrequest_container" />
        </div>
        <FriendsList />
      </div>
    </UserHomeNavigator>
  )
}
