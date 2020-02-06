import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function DeleteDialog(props) {
  const { open, friendID, handleClose, handleDelete, friendName } = props
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`sure you want to delete ${friendName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            press confirm if you want to delete {friendName} from your friends
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button
            onClick={() => {
              handleClose()
              handleDelete(friendID)
            }}
            color="primary"
            autoFocus
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
