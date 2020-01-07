const MeetUp = require('../models/MeetUp')
const Location = require('../models/Location')
const User = require('../models/User')

const LocationPopulation = async populatedMeetup => {
  populatedMeetup = await MeetUp.populate(populatedMeetup, {
    path: '_departure_locations',
    model: 'Location',
    populate: { path: '_creator' },
  })
  populatedMeetup = await MeetUp.populate(populatedMeetup, {
    path: '_suggested_locations',
    model: 'Location',
    populate: { path: '_creator' },
  })
  return populatedMeetup
}

const createLocation = async (isDepature, locationInfo, userId) => {
  let location = await Location.create({
    isDepature,
    _creator: userId,
    _location: { coordinates: [locationInfo.lat, locationInfo.lng] },
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
  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { _meetups: newMeetup.id } },
    { new: true }
  )
  return await LocationPopulation(newMeetup)
  // newMeetup = await newMeetup.populate('_departure_locations')
}

const addMeetupToUser = async meetupId => {}

const updateMeetupLocation = async (
  meetupId,
  locationId,
  userId,
  isDeparture
) => {
  let updatedMeetup
  if (isDeparture) {
    updatedMeetup = await MeetUp.findByIdAndUpdate(
      meetupId,
      { $addToSet: { _departure_locations: locationId } },
      { new: true }
    )
  } else {
    updatedMeetup = await MeetUp.findByIdAndUpdate(
      meetupId,
      { $addToSet: { _suggested_locations: locationId } },
      { new: true }
    )
  }
  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { _meetups: updatedMeetup.id } },
    { new: true }
  )
  return await LocationPopulation(updatedMeetup)
}

module.exports.createLocation = createLocation
module.exports.createMeetup = createMeetup
module.exports.updateMeetupLocation = updateMeetupLocation
