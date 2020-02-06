const express = require('express')
const passport = require('passport')
const router = express.Router()
const friends_crud = require('../CRUD/CRUD_friends')
const { createChat, getChats, getFriendChat } = require('../CRUD/CRUD_chat')
const uploader = require('../configs/cloudinary')

// signup up localy

router.post('/', (req, res) => {
  const friend_email = req.query.friendMail
  friends_crud
    .createAddRequest(friend_email, req.user._id)
    .then(created => {
      if (created) {
        res.status(200)
        res.json({ message: 'request send' })
      } else {
        res.status(404)
        res.json({ error: 'user not found' })
      }
    })
    .catch(err => console.error(err))
})

router.patch('/accept/:requestid', (req, res) => {
  const requestid = req.params.requestid
  friends_crud
    .acceptRequest(requestid)
    .then(({ recipientId, requesterId }) => {
      if (recipientId) {
        res.status(200)
        res.json({ message: 'request accepted' })
      }
      return chat_crud.createChat({ recipientId, requesterId })
    })
    .then(() => {
      console.log('chat created')
    })
    .catch(err => console.error(err))
})

router.patch('/decline/:requestid', (req, res) => {
  const requestid = req.params.requestid
  friends_crud
    .declineRequest(requestid)
    .then(accepted => {
      if (accepted) {
        res.status(200)
        res.json({ message: 'request accepted' })
      }
    })
    .catch(err => console.error(err))
})

router.patch('/delete/:friendID', (req, res) => {
  const friendID = req.params.friendID
  friends_crud
    .deleteFriend(friendID, req.user._id)
    .then(accepted => {
      if (accepted) {
        res.status(200)
        res.json({ message: 'friend deleted' })
      }
    })
    .catch(err => console.error(err))
})

router.get('/chats', (req, res) => {
  const userId = req.user._id
  getChats(userId)
    .then(sortedChats => {
      res.status(200)
      res.json(sortedChats)
    })
    .catch(err => console.error(err))
})

router.get('/chat/:friendID/:userID', (req, res) => {
  const friendID = req.params.friendID
  const userID = req.params.userID
  getFriendChat(friendID, userID)
    .then(friendChat => {
      res.status(200)
      res.json(friendChat)
    })
    .catch(err => console.error(err))
})

module.exports = router
