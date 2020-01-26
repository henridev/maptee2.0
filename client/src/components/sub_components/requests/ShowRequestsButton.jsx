import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import RequestList from './RequestList'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Badge from '@material-ui/core/Badge'
import { store } from '../../../redux/_store'
import { makeStyles } from '@material-ui/core/styles'

export default function SendRequestButton(props) {
  const userId = store.getState().user._id
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  const [requestCount, setRequestCount] = useState(
    store
      .getState()
      .user._friend_requests.filter(
        request => userId !== request._requester._id
      ).length
  )

  const useStyles = makeStyles({
    root: {
      border: '2px solid',
      boxShadow: '0 3px 5px 2px rgba(130, 130, 130, 0.64)',
    },
  })

  const classes = useStyles()

  return (
    <div className="pending_requests">
      <Badge badgeContent={requestCount} color="primary">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClick}
          classes={{
            root: classes.root,
          }}
        >
          show requests
        </Button>
      </Badge>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          incoming and outgoing requests
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <RequestList setRequestCount={setRequestCount} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
