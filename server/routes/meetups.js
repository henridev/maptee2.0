const express = require('express')
const { isLoggedIn } = require('../middlewares')
const meetup_crud = require('../CRUD/CRUD_meetups')
const router = express.Router()

router.post('/meetup', isLoggedIn, (req, res, next) => {
  const _admin = req.user._id
  const _users = req.user._id
  const meetup_date = req.body.meetup_date
  const meetup_time = req.body.meetup_time
  const name = req.body.name
  // should be either
  // current or searched location
  meetup_crud
    .createLocation({
      isDepature: true,
      info: req.body.departure_location,
    })
    .then(newLocation => {
      const departureId = newLocation._id
      return meetup_crud.createMeetUp(
        _admin,
        _users,
        meetup_date,
        meetup_time,
        name,
        departureId
      )
    })
    .then(newMeetUp => {
      console.log('new meetup created hooray!', NewMeetUp)
      res.json(NewMeetUp)
    })
})

module.exports = router
