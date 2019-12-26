const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth_crud = require('../CRUD/CRUD_auth')
const uploader = require('../configs/cloudinary')

// signup up localy
router.post('/signup', uploader.single('avatar'), (req, res, next) => {
  const { username, email, firstName, lastName, password } = req.body
  if (!username || !password || !email || !firstName || !lastName) {
    res.status(400).json({ message: 'Fill in all required fields' })
    return
  }
  auth_crud
    .findUserBy('username', username)
    .then(foundUser => {
      if (foundUser) {
        res.status(409).json({ message: 'username taken' })
        return
      }
      if (req.file) {
        return auth_crud.createUser({ ...req.body, avatar_url: req.file.url })
      }
      return auth_crud.createUser(req.body)
    })
    .then(newUser => {
      req.logIn(newUser, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        newUser.password = undefined
        res.json(newUser)
      })
    })
    .catch(err => next(err))
})

// login with a local account
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.logIn(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

// login with a google account
router.get(
  '/login-google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get(
  '/login-google/callback',
  passport.authenticate('google', { scope: ['profile'] }),
  (req, res, next) => {
    req.logIn(req.user, () => {
      req.user.password = undefined
      res.redirect(`${process.env.CLIENT_URL}`)
    })
  }
)

router.get('/info', (req, res) => {
  if (req.user) {
    res.json({ user: req.user })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

router.get('/return-google-user', (req, res) => {})

module.exports = router
