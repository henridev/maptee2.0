const express = require('express')
const { isLoggedIn } = require('../middlewares')
const {
  createLocation,
  createMeetup,
  updateMeetupLocation,
  addMeetupToUser,
  declineMeetupRequest,
  acceptMeetupRequest,
  sendMeetupRequest,
  getMeetupRequests,
} = require('../CRUD/CRUD_meetups')
const router = express.Router()

router.post('/meetup', isLoggedIn, (req, res, next) => {
  const meetup_date = req.body.meetup_date
  const name = req.body.name
  const description = req.body.description
  const locationInfo = {
    g_id: req.body.g_id,
    g_name: req.body.g_name,
    lat: req.body.lat,
    lng: req.body.lng,
  }
  // should be either
  // current or searched location
  createLocation(true, locationInfo, req.user._id)
    .then(newLocation => {
      const departureId = newLocation._id
      return createMeetup(
        req.user._id,
        meetup_date,
        name,
        description,
        departureId
      )
    })
    .then(newMeetUp => {
      res.json(newMeetUp)
    })
    .catch(err => {
      console.error(err)
    })
})

router.patch('/meetup/:meetupId/', isLoggedIn, (req, res, next) => {
  const meetupId = req.params.meetupId
  // ?departure=true
  const isDeparture = req.query.departure === 'true' ? true : false
  const locationInfo = {
    g_id: req.body.g_id,
    g_name: req.body.g_name,
    lat: req.body.lat,
    lng: req.body.lng,
  }

  createLocation(isDeparture, locationInfo, req.user._id)
    .then(newLocation => {
      const locationId = newLocation._id
      return updateMeetupLocation(
        meetupId,
        locationId,
        req.user._id,
        isDeparture
      )
    })
    .then(updatedMeetup => {
      res.json(updatedMeetup)
    })
    .catch(err => console.error(err))
})

router.patch(
  '/meetup/users/:meetupID/:friendID',
  isLoggedIn,
  (req, res, next) => {
    const meetupId = req.params.meetupID
    const friendID = req.params.friendID
    const userID = req.user._id
    sendMeetupRequest(meetupId, friendID, userID)
      .then(createdMeetupRequest => {
        return res.json({ msg: 'invitation send' })
      })
      .catch(err => console.error(err))
  }
)

router.get('/meetupInvites/:userId', isLoggedIn, (req, res, next) => {
  const userId = req.params.userId
  getMeetupRequests(userId)
    .then(meetupInvites => {
      return res.json({ meetupInvites: meetupInvites })
    })
    .catch(err => console.error(err))
})

module.exports = router
