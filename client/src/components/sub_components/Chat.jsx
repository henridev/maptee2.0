import React from 'react'
import io from 'socket.io-client'

export default function Button(props) {
  // set up a socket connection to localhost 5000
  const socket = io(
    process.env.NODE_ENV === 'production'
      ? `/`
      : `http://${window.location.hostname}:5000`
  )
  console.log(socket, window.location.hostname)
  return <div></div>
}
