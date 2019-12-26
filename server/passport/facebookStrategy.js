const passportCustom = require('passport-custom')
const passport = require('passport')
const auth_crud = require('../CRUD/CRUD_auth')
const CustomStrategy = passportCustom.Strategy

passport.use(
  new CustomStrategy(async function(req, done) {
    console.log(req.body, '-----')
    const { name, email, id, userID, picture } = req.body
    const pictureUrl = picture.data.url
    try {
      console.log(name, email, id, userID, picture)
      let foundUser = await auth_crud.findUserBy('facebook_id', id)
      foundUser = await auth_crud.findUserBy('email', email)
      if (!foundUser) {
        const newUser = await auth_crud.createFacebookUser({
          name,
          email,
          id,
          userID,
          pictureUrl,
        })
        done(null, newUser)
      }
      if (foundUser) {
        console.log('user already exists ', foundUser)
        done(null, foundUser)
      }
    } catch (err) {
      console.error(err)
    }
  })
)
