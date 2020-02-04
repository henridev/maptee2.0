import React, { useState, useEffect, useCallback } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import FriendAvatarList from '../sub_components/chat/FriendAvatarList'
import CurrentChat from '../sub_components/chat/CurrentChat'
import io from 'socket.io-client'
import { store } from '../../redux/_store'
import api from '../../apis/friends_api'

let chat

export default function ChatPage(props) {
  // set up a socket connection to localhost 5000
  const [user, setUser] = useState({
    id: store.getState().user._id,
    username: store.getState().user.username,
  })
  const [input, setInput] = useState('')
  const [chats, setChats] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])

  function scrollToBottom() {
    const chatbubble = document.querySelector('.chat_bubble_container')
    chatbubble.scrollTop = chatbubble.scrollHeight
  }

  useEffect(() => {
    scrollToBottom()
    // open chat connection
    chat = io.connect(
      process.env.NODE_ENV === 'production'
        ? `/chat`
        : `http://${window.location.hostname}:5000/chat`
    )

    // get the users chats
    // set them as states
    api
      .getChats()
      .then(sortedFoundChats => {
        setChats(sortedFoundChats)
        setCurrentChat(sortedFoundChats[0])
        setMessages(sortedFoundChats[0]._messages)
        const chatId = sortedFoundChats[0]._id
        chat.emit('join', { chatId: chatId })
      })
      .catch(err => {
        console.log(err)
      })

    return () => {
      chat.emit('disconnect')
      chat.off()
    }
  }, [])

  useEffect(() => {
    chat.on('msg', ({ sender, msg, chatId }) => {
      console.log('received a message', msg)
      setMessages([...messages, { content: msg, user: sender.id }])
      scrollToBottom()
    })
    return () => {
      chat.emit('disconnect')
      chat.off()
    }
  }, [messages])

  // when new message is received event listener should be changed to use latest
  // updated state and cleanup the event listener otherwise the app will slow down
  // really quickly

  const changeChat = newChatId => {
    console.log('changeing to chat', newChatId)
    chat.emit('change', {
      oldChatId: currentChat._id,
      newChatId: newChatId,
      user: user,
    })
    const filteredChat = chats.find(chat => chat._id === newChatId)
    setMessages(filteredChat._messages)
    setCurrentChat(filteredChat)
  }

  const handleMessageEmit = e => {
    e.preventDefault()
    console.log('handling emit message')
    setInput('')
    chat.emit('new', { msg: input, from: user, chatId: currentChat._id })
  }

  const handleChange = e => setInput(e.target.value)

  return (
    <UserHomeNavigator activeIndex={4} history={props.history}>
      <div className="chat_wrapper">
        <CurrentChat
          handleChange={handleChange}
          handleMessageEmit={handleMessageEmit}
          messagesInfo={messages}
          userID={user.id}
        ></CurrentChat>
        {chats && currentChat && (
          <FriendAvatarList
            changeChat={changeChat}
            chats={chats.filter(chat => !chat.isGroupChat)}
            currentChatID={currentChat._id}
            className="friend_list"
          />
        )}
      </div>
    </UserHomeNavigator>
  )
}
