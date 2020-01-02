// how does our our app state change
// in response to an action that tells us
// what to change
import user_update from './_userupdate'
import meetups_update from './_meetupsupdate'

const startState = {
  user: null,
  meetups: null,
}

export default function app(state = startState, action) {
  return {
    user: user_update(state.user, action),
    meetups: meetups_update(state.meetups, action),
  }
}
