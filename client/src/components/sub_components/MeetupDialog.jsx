import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
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
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
})

function SimpleDialog(props) {
  const classes = useStyles()
  const [meetups, setMeetups] = useState(store.getState().meetups)
  const { open } = props

  const handleClick = meetupID => {}

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">your meetups</DialogTitle>
      <List>
        {meetups.map(meetup => {
          return (
            <ListItem>
              <ListItemText>{meetup.name}</ListItemText>
              <AddIcon
                onClick={() => {
                  handleClick(meetup._id)
                }}
              />
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

export default function SimpleDialogDemo({ open }) {
  return (
    <div>
      <SimpleDialog open={open} />
    </div>
  )
}
