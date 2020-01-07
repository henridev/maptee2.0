import Avatar from '@material-ui/core/Avatar'
import React, { useState } from 'react'
import { store } from '../../redux/_store'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

export default function FriendList(props) {
  const [friends, setFriends] = useState(store.getState().user._friends)

  if (!friends) {
    return null
  }
  return (
    <div className="friendlist">
      {friends.map(friend => {
        return (
          <div className="friend_wrapper">
            <Avatar
              alt="user"
              src={friend.avatar_url}
              style={{ width: 150, height: 150 }}
            />
            <h1 className="friend_name">{friend.username}</h1>
            <div className="friend_icon_wrapper">
              <i className="fas fa-heart"></i>
              <i className="fas fa-share"></i>
              <i className="fas fa-users"></i>
            </div>
          </div>
        )
      })}
    </div>
  )
}
