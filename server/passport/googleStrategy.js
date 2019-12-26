const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const User = require('../models/User')
const chalk = require('chalk')

passport.use(
  new GoogleStrategy(
    // options
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/authentication/login-google/callback',
    },
    // this gets send to callback url
    async (accessToken, refreshToken, profile, done) => {
      console.log(JSON.stringify(profile), 'google info')
      const foundUser = await User.findOne({ google_id: profile.id })
      if (!foundUser) {
        const newUser = await new User({
          username: profile.displayName,
          google_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.email,
        }).save()
        done(null, newUser)
        console.log('new google user created', newUser)
      } else {
        console.log('user already exists', foundUser)
        done(null, foundUser)
      }
    }
  )
)
