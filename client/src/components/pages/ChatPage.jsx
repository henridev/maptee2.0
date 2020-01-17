import React, { useState, useEffect } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
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

  useEffect(() => {
    api
      .getChats()
      .then(foundChats => setChats(foundChats))
      .catch(err => {
        console.log(err)
      })
    socket.on('message received', msg => {
      console.log(msg)
      setMessagesInfo([...messagesInfo, msg])
    })
  }, [])

  const handleMessageEmit = () => {
    socket.emit('message sent', { message: input, user: user })
  }

  const handleChange = e => setInput(e.target.value)

  const renderMessages = () => {
    if (messagesInfo.length === 0) return null
    return messagesInfo.map((info, i) => {
      return (
        <div key={i} data-user={info.user.id}>
          <div>{info.message}</div>
          <div>{info.user.username}</div>
        </div>
      )
    })
  }

  return (
    <UserHomeNavigator activeIndex={4} history={props.history}>
      <div className="chat_wrapper">
        <div className="message_box">{renderMessages()}</div>
        <input onChange={handleChange} placeholder="insert message here" />
        <button onClick={handleMessageEmit}>sent message</button>
      </div>
    </UserHomeNavigator>
  )
}
