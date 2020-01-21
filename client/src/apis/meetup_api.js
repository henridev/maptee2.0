import axios from 'axios'

console.log(process.env.NODE_ENV)

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:5000/api`,
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

  addMeetup(body) {
    console.log(body)
    return service
      .post('/meetup', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addLocation(meetupId, isDeparture, body) {
    return service
      .patch(`/meetup/${meetupId}?departure=${isDeparture.toString()}`, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addSuggestion() {
    return service
      .post('/secret')
      .then(res => res.data)
      .catch(errHandler)
  },

  addUser(meetupId, userId, body = null) {
    return service
      .patch(`/meetup/user/${meetupId}/${userId}`, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addPicture(file) {
    const formData = new FormData()
    formData.append('picture', file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
