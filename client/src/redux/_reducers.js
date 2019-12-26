// how does our our app state change
// in response to an action that tells us
// what to change
import user_update from './_userupdate'

const startState = {
  user: null,
}

export default function app(state = startState, action) {
  return {
    user: user_update(state.user, action),
  }
}
