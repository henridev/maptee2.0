const MeetUp = require('../models/MeetUp')
const Location = require('../models/Location')

const createLocation = async (
  isDepature,
  locationInfo,
  locationInfolat,
  locationInfolng,
  userId
) => {
  let location = await Location.create({
    isDepature,
    _creator: userId,
    _location: { coordinates: [locationInfolat, locationInfolng] },
    g_id: locationInfo.g_id,
    g_name: locationInfo.g_name,
  })
  return location
}

const createMeetup = async (
  userId,
  meetup_date,
  name,
  description,
  departureId,
  suggestionId = undefined
) => {
  // conversion of meetup date and meetup time
  // on server side
  // is the best approach
  let newMeetup = await MeetUp.create({
    name: name,
    description: description,
    meetup_date: meetup_date,
    _suggested_locations: void (suggestionId !== undefined && suggestionId),
    _departure_locations: departureId,
    _users: [userId],
    _admin: userId,
  })
  return await MeetUp.populate(newMeetup, {
    path: '_departure_locations',
    populate: { path: '_creator' },
  })
  // newMeetup = await newMeetup.populate('_departure_locations')
}

module.exports.createLocation = createLocation
module.exports.createMeetup = createMeetup
