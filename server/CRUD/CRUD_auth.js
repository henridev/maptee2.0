const User = require('../models/User')
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

const userPopulation = async populatedUser => {
  return await User.populate(populatedUser, [
    {
      path: '_meetups',
      populate: [
        {
          path: '_departure_locations',
          model: 'Location',
          populate: {
            path: '_creator',
            model: 'User',
          },
        },
        {
          path: '_suggested_locations',
          model: 'Location',
          populate: {
            path: '_creator',
            model: 'User',
          },
        },
        {
          path: '_users',
          model: 'User',
        },
      ],
    },
    {
      path: '_friend_requests',
      model: 'FriendRequest',
      populate: [
        {
          path: '_recipient',
          model: 'User',
        },
        { path: '_requester', model: 'User' },
      ],
    },
  ])
  return await populatedUser.populate(populatedUser, {
    path: '_friend_requests',
    model: 'FriendRequest',
  })
}

const maskPassword = foundUser => {
  return foundUser._meetups.map(meetup => {
    const _users = meetup._users.map(user => {
      delete user.password
      return { ...user }
    })
    meetup._users = _users
    return meetup
  })
}

const createUser = async userInfo => {
  try {
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(userInfo.password, salt)
    const newUser = new User({ ...userInfo, password: hashPass })
    const created_user = await newUser.save()
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
    if (searchquery === 'email') {
      foundUser = await User.findOne({ email: searchterm })
    }
    foundUser = await userPopulation(foundUser)
    foundUser._meetups = maskPassword(foundUser)
    return foundUser !== null ? foundUser : false
  } catch (err) {
    console.log(err, 'error during user lookup')
  }
}

const createGoogleUser = async profile => {
  const newUser = await new User({
    username: profile.displayName,
    google_id: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.email,
  }).save()
  console.log('new google user created', newUser)
  return newUser
}

const createFacebookUser = async profile => {
  const newUser = await new User({
    username: profile.name,
    facebook_id: profile.id,
    firstName: profile.name.substr(0, profile.name.indexOf(' ')),
    lastName: profile.name.substr(profile.name.indexOf(' ') + 1),
    email: profile.email,
    avatar_url: profile.pictureUrl,
  }).save()
  console.log('new facebook user created', newUser)
  return newUser
}

const checkUsernamePassword = async (username, password) => {
  try {
    let foundUser = await User.findOne({ username })
    if (!foundUser) {
      return false
    }
    if (bcrypt.compareSync(password, foundUser.password)) {
      foundUser = await userPopulation(foundUser)
      foundUser._meetups = maskPassword(foundUser)
      console.log(foundUser)
      return foundUser
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports.findUserBy = findUserBy
module.exports.createUser = createUser
module.exports.checkUsernamePassword = checkUsernamePassword
module.exports.createFacebookUser = createFacebookUser
module.exports.createGoogleUser = createGoogleUser
module.exports.userPopulation = userPopulation
