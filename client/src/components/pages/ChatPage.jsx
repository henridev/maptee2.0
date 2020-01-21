import React, { useState, useEffect, useCallback } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import FriendAvatarList from '../sub_components/chat/FriendAvatarList'
import CurrentChat from '../sub_components/chat/CurrentChat'

import io from 'socket.io-client'
import { store } from '../../redux/_store'
import api from '../../apis/friends_api'

const socket = io(
  process.env.NODE_ENV === 'production'
    ? `/`
    : `http://${window.location.hostname}:5000`
)

export default function ChatPage(props) {
  // set up a socket connection to localhost 5000
  const [user, setUser] = useState({
    id: store.getState().user._id,
    username: store.getState().user.username,
  })
  const [input, setInput] = useState('')
  const [chats, setChats] = useState(null)
  const [messagesInfo, setMessagesInfo] = useState([])
  const [currentChat, setCurrentChat] = useState(null)

  // get the chat history
  useEffect(() => {
    api
      .getChats()
      .then(sortedFoundChats => {
        setChats(sortedFoundChats)
        setCurrentChat(sortedFoundChats[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // when new message is received event listener should be changed to use latest
  // updated state and cleanup the event listener otherwise the app will slow down
  // really quickly
  const handleMessageReception = msg => setMessagesInfo([...messagesInfo, msg])
  useEffect(() => {
    socket.on('message received', handleMessageReception)
    return () => socket.off('message received')
  }, [handleMessageReception])

  const handleMessageEmit = () => {
    socket.emit('message sent', { message: input, user: user })
  }

  const handleChange = e => setInput(e.target.value)

  return (
    <UserHomeNavigator activeIndex={4} history={props.history}>
      <div className="chat_wrapper">
        <CurrentChat
          handleChange={handleChange}
          handleMessageEmit={handleMessageEmit}
          messagesInfo={messagesInfo}
          userID={user.id}
        ></CurrentChat>
        {chats && currentChat && (
          <FriendAvatarList
            chats={chats.filter(chat => !chat.isGroupChat)}
            currentChatID={currentChat._id}
            className="friend_list"
          />
        )}
      </div>
    </UserHomeNavigator>
  )
}
