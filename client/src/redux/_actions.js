// Actions are payloads of information
// that send data from your application to your store.
// VIA store.dispatch()
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_MEETUPS = 'SET_MEETUPS'
export const ADD_MEETUP = 'ADD_MEETUP'
export const REMOVE_REQUEST = 'REMOVE_REQUEST'

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
export const remove_user = user => {
  return {
    type: REMOVE_USER,
    user: user,
  }
}

export const set_meetups = meetups => {
  return {
    type: SET_MEETUPS,
    meetups: meetups,
  }
}

export const add_meetup = meetup => {
  return {
    type: ADD_MEETUP,
    meetups: meetup,
  }
}

export const remove_request = requestID => {
  return {
    type: REMOVE_REQUEST,
    requestID: requestID,
  }
}
