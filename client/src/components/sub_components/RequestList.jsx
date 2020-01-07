import Avatar from '@material-ui/core/Avatar'
import React, { useState } from 'react'
import { store } from '../../redux/_store'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import api from '../../apis/friends_api'

export default function RequestList(props) {
  const userId = store.getState().user._id
  const [requests, setRequest] = useState(
    store.getState().user._friend_requests
  )
  console.log('reqq', requests)
  if (!requests) {
    return null
  }
  return (
    <div>
      {requests.map(request => {
        if (userId === request._requester._id) {
          return (
            <div data-requestId={request._id} className="out_request_wrapper">
              <Avatar alt="user" src={request._recipient.avatar_url} />
              <div>
                <span>request </span>
                <span>for {request._recipient.username}</span>
              </div>
            </div>
          )
        } else {
          return (
            <div data-requestId={request._id} className="in_request_wrapper">
              <Avatar alt="user" src={request._requester.avatar_url} />
              <div className="request_text">
                <span>{request._requester.username}</span>
                <span>friend request </span>
              </div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => api.acceptFriendRequest(request._id)}
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => api.declineFriendRequest(request._id)}
              >
                <NotInterestedIcon />
              </IconButton>
            </div>
          )
        }
      })}
    </div>
  )
}
