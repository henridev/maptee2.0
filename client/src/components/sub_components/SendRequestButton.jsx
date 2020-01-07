import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function SendRequestButton({
  openbtn,
  text,
  title,
  cancelbtn,
  sendbtn,
  className,
  sendHandler,
}) {
  const [open, setOpen] = React.useState(false)
  const [inputval, setInputVal] = React.useState('')
  const handleClick = () => {
    setOpen(!open)
  }

  const handleSend = () => {
    setOpen(false)
    sendHandler(inputval)
  }

  return (
    <div className={className}>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        {openbtn}
      </Button>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={inputval}
            onChange={e => {
              setInputVal(e.target.value)
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            {cancelbtn}
          </Button>
          <Button onClick={handleSend} color="primary">
            {sendbtn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
