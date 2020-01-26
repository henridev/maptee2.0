import Avatar from '@material-ui/core/Avatar'
import React, { useState } from 'react'
import { store } from '../../redux/_store'
import api from '../../apis/friends_api'
import MeetupDialog from './MeetupDialog'
export default function FriendList(props) {
  const [friends, setFriends] = useState(store.getState().user._friends)
  const [inviteInfo, SetInviteInfo] = useState({ open: false, friendId: '' })
  const handleDelete = friendID => {
    api
      .deleteFriend(friendID)
      .then(setFriends(friends.filter(friend => friend._id !== friendID)))
      .catch(err => {
        console.error(err)
      })
  }
  const handleClickInvite = friendId => {
    console.log(friendId)
    SetInviteInfo({ open: true, friendId: friendId })
  }

  const handleClose = () => SetInviteInfo({ open: false, friendId: '' })

  if (!friends) {
    return null
  }

  return (
    <div className="friendlist">
      <MeetupDialog
        open={inviteInfo.open}
        friendID={inviteInfo.friendId}
        SetInviteInfo={SetInviteInfo}
        handleClose={handleClose}
      />
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
              <div className="friend_icons">
                <i className="far fa-comment"></i>
                <b>chat</b>
              </div>
              <div
                className="friend_icons"
                onClick={() => handleClickInvite(friend._id)}
              >
                <i className="fas fa-users"></i>
                <b>invite</b>
              </div>
              <div
                className="friend_icons"
                onClick={() => handleDelete(friend._id)}
              >
                <i className="fas fa-user-times"></i>
                <b>remove</b>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
