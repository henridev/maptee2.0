import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import { store } from '../../redux/_store'
import { blue } from '@material-ui/core/colors'
import api from '../../apis/meetup_api'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
})

function SimpleDialog(props) {
  const classes = useStyles()
  const [meetups, setMeetups] = useState(store.getState().meetups)
  const { open, friendID, handleClose } = props

  const handleInvite = meetupID => {
    api
      .sendMeetupInvite(meetupID, friendID)
      .then(res => {
        console.log(res)
        handleClose()
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="simple-dialog-title">your meetups</DialogTitle>
      <List>
        {meetups.map(meetup => {
          return (
            <ListItem>
              <ListItemText>{meetup.name}</ListItemText>
              <AddIcon
                onClick={() => {
                  handleInvite(meetup._id, friendID)
                }}
              />
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

export default function SimpleDialogDemo({
  open,
  friendID,
  SetInviteInfo,
  handleClose,
}) {
  return (
    <div>
      <SimpleDialog
        open={open}
        friendID={friendID}
        handleClose={handleClose}
        setInviteInfo={SetInviteInfo}
      />
    </div>
  )
}
