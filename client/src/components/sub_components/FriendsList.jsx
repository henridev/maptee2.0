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
    <div>
      {friends.map(friend => {
        return (
          <div className="out_friend_wrapper">
            <Avatar alt="user" src={friend.avatar_url} />
            <div>
              <span>{friend.username}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
