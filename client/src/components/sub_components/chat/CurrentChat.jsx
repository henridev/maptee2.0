import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  container: {
    bottom: 0,
    // position: "fixed" // remove this so we can apply flex design
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex', //new added flex so we can put div at left and right side
    //check style.css for left and right classnaeme based on your data
  },
  bubble: {
    border: '1px solid gray',
    margin: '5px',
    display: 'inline-block',
    padding: '5px',
    backgroundColor: 'antiquewhite',
    borderRadius: '10px',
    fontWeight: 500,
  },
}))

const ChatLayout = props => {
  const classes = useStyles()
  console.log('msg info', props.messagesInfo, props.userID)
  const chatBubbles = props.messagesInfo.map((info, i = 0) => (
    <div
      className={`${classes.bubbleContainer}  ${
        info.user.id === props.userID ? 'right' : 'left'
      }`}
      key={i}
    >
      <div key={i++} className={classes.bubble}>
        <div className={classes.button}>{info.message}</div>
      </div>
    </div>
  ))
  return (
    <div className={`${classes.container} current_chat`}>
      <div className="chat_bubble_container">
        {props.messagesInfo.length > 0 && chatBubbles}
      </div>
      <input
        className="message_input"
        onChange={props.handleChange}
        placeholder="insert message here"
      />
      <button className="message_send_btn" onClick={props.handleMessageEmit}>
        sent message
      </button>
    </div>
  )
}

export default ChatLayout
