import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    border: '2px solid',
    boxShadow: '0 3px 5px 2px rgba(130, 130, 130, 0.64)',
  },
})

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
  const [sendText, setSendText] = React.useState(false)
  const [inputval, setInputVal] = React.useState('')
  const handleClick = () => {
    setOpen(!open)
    setSendText(false)
  }

  const handleSend = async () => {
    setSendText('sending request')
    const email = inputval
    setInputVal('')
    const isSent = await sendHandler(email)
    if (!isSent) {
      setSendText('request failed')
    } else {
      setSendText('request sent!')
      const timeoutID = setTimeout(function() {
        setSendText(false)
        setOpen(false)
        clearTimeout(timeoutID)
      }, 3000)
    }
  }

  const classes = useStyles()

  return (
    <div className={className}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        classes={{
          root: classes.root,
        }}
      >
        {openbtn}
      </Button>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        {!sendText ? (
          <>
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
          </>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>{sendText}</DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  )
}
