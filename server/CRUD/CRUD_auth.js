const User = require('../models/User')
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

const createUser = async userInfo => {
  try {
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(userInfo.password, salt)
    const newUser = new User({ ...userInfo, password: hashPass })
    const created_user = await newUser.save()
    console.log('user created: ', created_user)
    return created_user
  } catch (err) {
    console.error(err, 'error during user creation')
  }
}

const findUserBy = async (searchquery, searchterm) => {
  try {
    let foundUser
    if (searchquery === 'username') {
      foundUser = await User.findOne({ username: searchterm })
    }
    if (searchquery === 'google_id') {
      foundUser = await User.findOne({ google_id: searchterm })
    }
    if (searchquery === 'facebook_id') {
      foundUser = await User.findOne({ facebook_id: searchterm })
    }
    return foundUser !== null ? foundUser : false
  } catch (err) {
    console.log(err, 'error during user lookup')
  }
}

const checkUsernamePassword = async (username, password) => {
  try {
    const foundUser = await findUserBy('username', username)
    if (!foundUser) {
      return false
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      console.log('here')
      return foundUser
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports.findUserBy = findUserBy
module.exports.createUser = createUser
module.exports.checkUsernamePassword = checkUsernamePassword
