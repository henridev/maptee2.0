const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const auth_crud = require('../CRUD/CRUD_auth')
const chalk = require('chalk')

passport.use(
  new GoogleStrategy(
    // options
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/api/user/login-google/callback',
    },
    // this gets send to callback url
    async (accessToken, refreshToken, profile, done) => {
      console.log(JSON.stringify(profile), 'google info')
      let foundUser = await auth_crud.findUserBy('google_id', profile.id)
      foundUser = await auth_crud.findUserBy('email', profile.email)
      if (!foundUser) {
        const newUser = await auth_crud.createGoogleUser(profile)
        done(null, newUser)
      }
      if (foundUser) {
        console.log('user already exists ', foundUser)
        done(null, foundUser)
      }
    }
  )
)
