const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

router.get('/add_location/:meetupID', (req, res, next) => {
  console.log(req.body)
  res.json({
    secret: 42,
    user: req.user,
  })
})

module.exports = router
