import React, { useState, useEffect, useCallback } from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import FriendAvatarList from '../sub_components/chat/FriendAvatarList'
import CurrentChat from '../sub_components/chat/CurrentChat'
import io from 'socket.io-client'
import { store } from '../../redux/_store'
import api from '../../apis/friends_api'
import ChatSocket from '../../functions/SocketClient'

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

  const scrollToBottom = () => {
    const chatbubble = document.querySelector('.chat_bubble_container')
    chatbubble.scrollTop = chatbubble.scrollHeight
  }

  const handleMsgReception = ({ sender, msg, chatId }) => {
    console.log('received message from', sender)
    setMessages([...messages, { content: msg, user: sender.id }])
    scrollToBottom()
  }

  useEffect(() => {
    scrollToBottom()
    // open chat connection
    chat = new ChatSocket('chat', user)
    console.log(chat)
    chat.attachMsgListener('msg', handleMsgReception)
    // get the users chats
    // set them as states
    api
      .getChats()
      .then(sortedFoundChats => {
        setChats(sortedFoundChats)
        setCurrentChat(sortedFoundChats[0])
        setMessages(sortedFoundChats[0]._messages)
        const chatId = sortedFoundChats[0]._id
        chat.connectViaChatId(chatId)
      })
      .catch(err => {
        console.error(err)
      })

    return () => {
      chat.disconnect()
    }
  }, [])

  useEffect(() => {
    try {
      chat.attachMsgListener('msg', handleMsgReception)
    } catch (err) {
      console.error(err)
    }
    return () => {
      chat.disconnect()
    }
  }, [messages])

  // when new message is received event listener should be changed to use latest
  // updated state and cleanup the event listener otherwise the app will slow down
  // really quickly

  const changeChat = newChatId => {
    chat.changeChat(newChatId)
    const filteredChat = chats.find(chat => chat._id === newChatId)
    setMessages(filteredChat._messages)
    setCurrentChat(filteredChat)
  }

  const handleMessageEmit = e => {
    e.preventDefault()
    console.log('handling emit message')
    setInput('')
    chat.emitMessage(input, user)
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
