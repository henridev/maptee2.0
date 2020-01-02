import { SET_MEETUPS, ADD_MEETUP } from './_actions.js'

export default function meetups_update(meetups = null, action) {
  switch (action.type) {
    case SET_MEETUPS:
      return action.meetups
    case ADD_MEETUP:
      return action.meetup
    default:
      return meetups
  }
}
