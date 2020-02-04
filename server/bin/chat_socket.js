const { addMessage } = require('../CRUD/CRUD_chat')

const handleChatConnection = (socket, io) => {
  console.log('a user connected')

  socket.on('join', ({ chatId }) => {
    socket.join(chatId)
    console.log('user joins room', chatId)
  })

  socket.on('change', ({ oldChatId, newChatId, user }) => {
    console.log('user leaves room', oldChatId)
    socket.leave(oldChatId)
    socket.join(newChatId)
    console.log('user joins room', newChatId)
    socket.broadcast.to(newChatId).emit('newuser', { user: user })
  })

  socket.on('leave', ({ chatId }, callback) => {
    console.log('user leaves room', chatId)
  })

  socket.on('new', ({ chatId, msg, from }) => {
    console.log('sending message from ', from)
    console.log('sending to chat ', chatId)
    console.log('message is', msg)
    addMessage(msg, from.id, chatId)
    io.to(chatId).emit('msg', { msg, sender: from, chatId })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

// const handleJoin = (socket, chatId) => {
//   console.log('user joined the room')
//   socket.join(chatId)
//   chat.to(chatId).emit('user joined room')
// }

// const handleLeave = (socket, chatId) => {
//   console.log('user joined the room')
//   socket.leave(chatId)
//   chat.to(chatId).emit('user left room')
// }

//   chat.on('leave', chatId => {
//     socket.leave(chatId)
//     chat.to(chatId).emit('user left room')
//   })

//   chat.on('new', info => {
//     console.log(info)
//     chat.to(chatId).emit(info)
//   })

//   chat.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// }

module.exports = handleChatConnection
