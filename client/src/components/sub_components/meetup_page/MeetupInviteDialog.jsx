import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { blue } from '@material-ui/core/colors'
import MeetupInviteBadge from './MeetupInviteBadge'
import api from '../../../apis/meetup_api'
import { store, startState } from '../../../redux/_store'
import EmailIcon from '@material-ui/icons/Email'

const emails = ['username@gmail.com', 'user02@gmail.com']
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
})

function InviteDialog(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open, meetupInvites } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">current invites</DialogTitle>
      <List>
        {meetupInvites.map(meetupInvite => (
          <ListItem
            button
            onClick={() => handleListItemClick()}
            key={meetupInvites._id}
          >
            <ListItemAvatar>
              <Avatar src={meetupInvite._requester.avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={`${meetupInvite._meetup.name}`} />
            <ListItemText
              primary={`${new Date(
                meetupInvite._meetup.meetup_date
              ).toDateString()}`}
            />
            <ListItemText
              primary={`${new Date(
                meetupInvite._meetup.meetup_date
              ).toLocaleTimeString()}`}
            />
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-ban"></i>
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="send invite" />
        </ListItem>
      </List>
    </Dialog>
  )
}

InviteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
}

export default function MeeetupInviteDialog() {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])
  const [meetupInvites, setMeetupInvites] = useState([])

  useEffect(() => {
    const userID = store.getState().user._id
    api
      .getMeetupInvites(userID)
      .then(res => {
        console.log('here', res.meetupInvites)
        setMeetupInvites(res.meetupInvites)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  const handleClickOpen = () => {
    console.log('clicked')
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      <MeetupInviteBadge
        handleClickOpen={handleClickOpen}
        meetupInviteCount={meetupInvites.length}
      />
      <InviteDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        meetupInvites={meetupInvites}
      />
    </div>
  )
}
