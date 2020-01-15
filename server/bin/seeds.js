const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const FriendRequest = require('../models/FriendRequest')
const friends_CRUD = require('../CRUD/CRUD_friends')

const bcryptSalt = 10

require('../configs/database')

const users = [
  {
    username: 'alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    email: 'alice@mail.com',
    firstName: 'alice',
    lastName: 'cooper',
    avatar_url: 'https://i.pravatar.cc/250?img=5',
  },
  {
    username: 'bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    email: 'bob@mail.com',
    firstName: 'bob',
    lastName: 'cooper',
    avatar_url: 'https://i.pravatar.cc/250?img=4',
  },
  {
    username: 'john',
    password: bcrypt.hashSync('john', bcrypt.genSaltSync(bcryptSalt)),
    email: 'john@mail.com',
    firstName: 'john',
    lastName: 'cooper',
    avatar_url: 'https://i.pravatar.cc/250?img=3',
  },
  {
    username: 'henri',
    password: bcrypt.hashSync('henri', bcrypt.genSaltSync(bcryptSalt)),
    email: 'henri@mail.com',
    firstName: 'henri',
    lastName: 'de bel',
    avatar_url: 'https://i.pravatar.cc/250?img=7',
  },
  {
    username: 'lucien',
    password: bcrypt.hashSync('lucien', bcrypt.genSaltSync(bcryptSalt)),
    email: 'lucien@mail.com',
    firstName: 'lucien',
    lastName: 'franco',
    avatar_url: 'https://i.pravatar.cc/250?img=11',
  },
  {
    username: 'lucie',
    password: bcrypt.hashSync('lucie', bcrypt.genSaltSync(bcryptSalt)),
    email: 'lucie@mail.com',
    firstName: 'lucie',
    lastName: 'franco',
    avatar_url: 'https://i.pravatar.cc/250?img=9',
  },
  {
    username: 'louis',
    password: bcrypt.hashSync('louis', bcrypt.genSaltSync(bcryptSalt)),
    email: 'louis@mail.com',
    firstName: 'louis',
    lastName: 'de bel',
    avatar_url: 'https://i.pravatar.cc/250?img=12',
  },
  {
    username: 'piet',
    password: bcrypt.hashSync('piet', bcrypt.genSaltSync(bcryptSalt)),
    email: 'piet@mail.com',
    firstName: 'piet',
    lastName: 'de bel',
    avatar_url: 'https://i.pravatar.cc/250?img=8',
  },
  {
    username: 'ash',
    password: bcrypt.hashSync('ash', bcrypt.genSaltSync(bcryptSalt)),
    email: 'ash@mail.com',
    firstName: 'ash',
    lastName: 'de bel',
    avatar_url: 'https://i.pravatar.cc/250?img=20',
  },
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`)
    const userIDS = usersCreated.map(u => u._id)
    console.log(userIDS)
    let requests = []
    userIDS.map((ID, i) => {
      if (i < userIDS.length) {
        const otherUsers = userIDS.filter(id => id !== ID)
        const request_arr = otherUsers.map(id => {
          return requests.push({
            _requester: ID,
            _recipient: id,
            status: false,
          })
        })
      }
    })
    console.log(requests)
    return FriendRequest.create(requests.slice(0, -1))
  })
  .then(createdRequests => {
    const requestAcceptPromises = createdRequests.map(u =>
      friends_CRUD.acceptRequest(u._id)
    )
    return Promise.all(requestAcceptPromises)
  })
  .then(values => {
    console.log(values, ' requests accepted')
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
