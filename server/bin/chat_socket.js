const handleConnection = socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = { handleConnection }
