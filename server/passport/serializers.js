const passport = require('passport')
const User = require('../models/User')

// user id is serialized in the session
// so with each new req we can use it to
// attach user to the req object
passport.serializeUser((loggedInUser, done) => {
  // console.log('serializing logged in user', loggedInUser)
  done(null, loggedInUser._id)
})

passport.deserializeUser((userIdFromSession, done) => {
  // in later reqs the id that was given to
  // the ses before will be used to find the user
  // now and attach the user to req.user
  User.findById(userIdFromSession)
    .then(userDocument => {
      // console.log(userDocument, 'deserialized user to attach to request object')
      userDocument.password = null
      done(null, userDocument)
    })
    .catch(err => {
      done(err)
    })
})
