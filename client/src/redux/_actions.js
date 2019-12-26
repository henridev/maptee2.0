// Actions are payloads of information
// that send data from your application to your store.
// VIA store.dispatch()
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

// type prop defines type of action performed
// Action creators -- create and return
// the actions
export const set_user = user_json => {
  return {
    type: SET_USER,
    user: user_json,
  }
}

// reference by index is smarter we don't have to send
// huge data sets
export const remove_user = () => {
  return {
    type: REMOVE_USER,
    user: null,
  }
}
