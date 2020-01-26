const MeetUp = require('../models/MeetUp')
const Location = require('../models/Location')
const User = require('../models/User')
const MeetupRequest = require('../models/MeetupRequest')

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

const findAndReplaceCurrentLocation = async (meetupId, locationId, userId) => {
  const meetupOne = await MeetUp.findById(meetupId).populate({
    path: '_departure_locations',
    model: 'Location',
  })
  const existingLocations = meetupOne._departure_locations.map(location => {
    // console.log(location._creator, 'heres', userId)
    if (String(location._creator) === String(userId)) {
      return location._id
    }
  })
  // console.log('here', existingLocations)
  const meetupTwo = await MeetUp.findByIdAndUpdate(
    meetupId,
    { $pullAll: { _departure_locations: existingLocations } },
    { new: true }
  )
  return await MeetUp.findByIdAndUpdate(
    meetupId,
    { $addToSet: { _departure_locations: locationId } },
    { new: true }
  )
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

const addMeetupToUser = async (meetupId, userID) => {
  const updatedUser = await User.findByIdAndUpdate(
    userID,
    { $addToSet: { _meetups: meetupId } },
    { new: true }
  )
  const updatedMeetup = await MeetUp.findByIdAndUpdate(
    meetupId,
    { $addToSet: { _users: userID } },
    { new: true }
  )
  return {
    msg: `user ${updatedUser.username} added to meetup ${updatedMeetup.name}`,
  }
}

const updateMeetupLocation = async (
  meetupId,
  locationId,
  userId,
  isDeparture
) => {
  let updatedMeetup
  if (isDeparture) {
    updatedMeetup = await findAndReplaceCurrentLocation(
      meetupId,
      locationId,
      userId
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

const sendMeetupRequest = async (meetupID, FriendID, userID) => {
  const createdMeetupRequest = await MeetupRequest.create({
    _requester: userID,
    _recipient: FriendID,
    _meetup: meetupID,
  })
  return createdMeetupRequest
}

const getMeetupRequests = async userID => {
  const FoundMeetupInvites = await MeetupRequest.find({
    _recipient: userID,
  })
    .populate({
      path: '_requester',
      select: 'username _id firstname lastname avatar_url',
    })
    .populate({
      path: '_meetup',
      select: 'name description meetup_date',
    })
  return FoundMeetupInvites
}

const acceptMeetupRequest = async meetupRequestID => {
  const FoundMeetupRequest = await MeetupRequest.findById(meetupRequestID)
  const recipientId = FoundMeetupRequest._recipient
  const meetupId = FoundMeetupRequest._meetup
  const addedInfo = await addMeetupToUser(meetupId, recipientId)
  return addedInfo
}

const declineMeetupRequest = async meetupRequestID => {
  const deletedMeetupRequest = await MeetupRequest.deleteOne({
    _id: meetupRequestID,
  })
  return { msg: 'invitation declined' }
}

module.exports = {
  createLocation: createLocation,
  createMeetup: createMeetup,
  updateMeetupLocation: updateMeetupLocation,
  addMeetupToUser: addMeetupToUser,
  declineMeetupRequest: declineMeetupRequest,
  acceptMeetupRequest: acceptMeetupRequest,
  sendMeetupRequest: sendMeetupRequest,
  getMeetupRequests: getMeetupRequests,
}
