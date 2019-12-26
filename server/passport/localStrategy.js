const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const auth_crud = require('../CRUD/CRUD_auth')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    // this is our verify callback to check provided
    // credentials, if the credentials are good we invoke done
    (username, password, done) => {
      auth_crud
        .checkUsernamePassword(username, password)
        .then(foundUser => {
          if (!foundUser) {
            done(null, false, { message: 'Incorrect username or password' })
            return
          } else {
            done(null, foundUser)
          }
        })
        .catch(err => done(err))
    }
  )
)
