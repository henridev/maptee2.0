const handleChatConnection = (socket, chat) => {
  console.log('a user connected')
  chat.on('join chat', chatId => {
    socket.join(chatId)
    chat.to(chatId).emit('user joined room')
  })
  chat.on('message sent', info => {
    console.log(info)
    chat.emit('message received', info)
  })

  chat.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = { handleChatConnection }
