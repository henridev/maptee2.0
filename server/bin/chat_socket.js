const handleConnection = (socket, io) => {
  console.log('a user connected')
  socket.on('message sent', info => {
    console.log(info)
    io.emit('message received', info)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = { handleConnection }
