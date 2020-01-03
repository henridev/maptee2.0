const express = require('express')
const { isLoggedIn } = require('../middlewares')
const meetup_crud = require('../CRUD/CRUD_meetups')
const router = express.Router()

router.post('/meetup', isLoggedIn, (req, res, next) => {
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
      req.user._id
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

router.patch("/meetup/:meetupId/", isLoggedIn, (req, res, next) => {
  const field = req.params.field;
  const meetupId = req.params.meetupId;
  // ?departure=true
  const isDeparture = Boolean(req.query.departure);

  const locationInfo = req.body.location
  const locationInfolat = req.body._departure_locations.lat
  const locationInfolng = req.body._departure_locations.lng

  meetup_crud
    .createLocation(
      isDeparture,
      locationInfo,
      locationInfolat,
      locationInfolng,
      req.user._id
  ).then((newLocation) => {
      const locationId = newLocation._id
      return meetup_crud.updateMeetup(meetupId, locationId, req.user._id)
  }).then((updatedMeetup) => {
      res.json(updatedMeetup)

    }).catch()
  
}
  

  
module.exports = router
