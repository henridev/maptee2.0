import axios from 'axios'

console.log(process.env.NODE_ENV)

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api/friends'
      : `http://${window.location.hostname}:5000/api/friends`,
  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,
  sendFriendRequest(email) {
    return service.post(`/?friendMail=${email}`)
  },

  acceptFriendRequest(requestId) {
    return service.patch(`/accept/${requestId}`)
  },

  declineFriendRequest(requestId) {
    return service.patch(`/decline/${requestId}`)
  },
  deleteFriend(friendID) {
    return service
      .patch(`/delete/${friendID}`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },
}
