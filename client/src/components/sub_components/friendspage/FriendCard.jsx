import Avatar from '@material-ui/core/Avatar'
import React, { useState } from 'react'

export default function FriendCard({
  friend,
  handleClickInvite,
  handleClickDelete,
}) {
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
          onClick={() => handleClickDelete(friend._id, friend.username)}
        >
          <i className="fas fa-user-times"></i>
          <b>remove</b>
        </div>
      </div>
    </div>
  )
}
