import { SET_USER, REMOVE_USER, REMOVE_REQUEST } from './_actions.js'

export default function userupdate(user = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return null
    case REMOVE_REQUEST:
      const requestID = action.requestID
      const _friend_requests = user._friend_requests.filter(request =>
        request._id !== requestID ? true : false
      )
      const updated_user = { ...user }
      updated_user._friend_requests = _friend_requests
      return updated_user
    default:
      return user
  }
}
