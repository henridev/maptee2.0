import Avatar from '@material-ui/core/Avatar'
import React, { useState } from 'react'
import io from 'socket.io-client'
import { store } from '../../../redux/_store'
import api from '../../../apis/friends_api'
import MeetupDialog from '../MeetupDialog'
import DeleteDialog from './DeleteDialog'
import FriendCard from './FriendCard'

let chat = null

export default function FriendList(props) {
  const [deleteInfo, SetDeleteInfo] = useState({ open: false, friendId: '' })
  const [friends, setFriends] = useState(store.getState().user._friends)
  const [inviteInfo, SetInviteInfo] = useState({
    open: false,
    friendId: '',
    friendName: '',
  })
  const [friendChat, setFriendChat] = useState(null)

  const handleChatClick = friendID => {
    const userID = store.getState().user._id
    api
      .getFriendChat(friendID, userID)
      .then(foundChat => {
        if (!chat) {
          chat = io.connect(
            process.env.NODE_ENV === 'production'
              ? `/chat`
              : `http://${window.location.hostname}:5000/chat`
          )
        }
        setFriendChat(foundChat)
        const chatId = foundChat._id
        chat.emit('join', { chatId: chatId })
      })
      .catch(err => console.error(err))
    return
  }

  const handleDelete = friendID => {
    api
      .deleteFriend(friendID)
      .then(setFriends(friends.filter(friend => friend._id !== friendID)))
      .catch(err => {
        console.error(err)
      })
  }

  const handleClickInvite = friendId =>
    SetInviteInfo({ open: true, friendId: friendId })

  const handleInviteClose = () => SetInviteInfo({ open: false, friendId: '' })

  const handleClickDelete = (friendId, friendName) =>
    SetDeleteInfo({ open: true, friendId: friendId, friendName: friendName })

  const handleDeleteClose = () =>
    SetDeleteInfo({ open: false, friendId: '', friendName: '' })

  if (!friends) {
    return null
  }

  return (
    <div className="friendlist">
      <MeetupDialog
        open={inviteInfo.open}
        friendID={inviteInfo.friendId}
        SetInviteInfo={SetInviteInfo}
        handleClose={handleInviteClose}
      />
      <DeleteDialog
        open={deleteInfo.open}
        friendID={deleteInfo.friendId}
        friendName={deleteInfo.friendName}
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
      {friends.map(friend => (
        <FriendCard
          friend={friend}
          handleClickInvite={handleClickInvite}
          handleClickDelete={handleClickDelete}
        />
      ))}
    </div>
  )
}
