import io from 'socket.io-client'

export default class SocketClient {
  constructor(url_param, user) {
    this.link =
      process.env.NODE_ENV === 'production'
        ? `/${url_param}`
        : `http://${window.location.hostname}:5000/${url_param}`
    this.connection = io.connect(this.link)
    this.chatId = null
    this.user = user
  }

  disconnect() {
    if (this.connection) {
      this.connection.emit('disconnect')
      this.connection.off()
      this.connection = null
    } else {
      console.log('not connected')
    }
  }

  connectViaChatId(chatId) {
    if (this.connection) {
      this.connection.emit('join', { chatId: chatId })
      this.chatId = chatId
    } else {
      console.log('not connected')
    }
  }

  attachMsgListener(event, callback) {
    this.connection.on(event, callback)
  }

  changeChat(newChatId) {
    this.connection.emit('change', {
      oldChatId: this.chatId,
      newChatId: newChatId,
      user: this.user,
    })
    this.chatId = newChatId
  }

  emitMessage(msg, user) {
    console.log(this.connection)
    this.connection.emit('new', {
      msg: msg,
      user: this.user,
      chatId: this.chatId,
    })
  }
}
