const express = require('express')
const { isLoggedIn } = require('../middlewares')
const meetup_crud = require('../CRUD/CRUD_meetups')
const router = express.Router()

router.post('/meetup', isLoggedIn, (req, res, next) => {
  const _admin = req.user._id
  const _users = req.user._id
  const meetup_date = req.body.meetup_date
  const name = req.body.name
  const description = req.body.description
  const locationInfo = req.body._departure_locations
  const locationInfolat = req.body._departure_locations.lat
  const locationInfolng = req.body._departure_locations.lng
  // should be either
  // current or searched location
  meetup_crud
    .createLocation(
      true,
      locationInfo,
      locationInfolat,
      locationInfolng,
      _users
    )
    .then(newLocation => {
      const departureId = newLocation._id
      return meetup_crud.createMeetup(
        _admin,
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

module.exports = router
