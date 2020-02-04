import React, { useRef, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  container: {
    bottom: 0,
    overflow: 'overlay',
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
    borderRadius: '10px',
    fontWeight: 500,
  },
}))

const CurrentChat = props => {
  const classes = useStyles()
  const messagesEnd = useRef(null)

  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }, [])
  // console.log('msg info', props.messagesInfo, props.userID)
  const chatBubbles = props.messagesInfo.map((info, i = 0) => (
    <div
      className={`${classes.bubbleContainer}  ${
        info.user === props.userID ? 'left' : 'right'
      }`}
      key={i}
    >
      <div key={i++} className={classes.bubble}>
        <div className={classes.button}>{info.content}</div>
      </div>
    </div>
  ))
  return (
    <div className={`${classes.container} current_chat`}>
      <div className="chat_bubble_container">
        {props.messagesInfo.length > 0 && chatBubbles}
        <div ref={messagesEnd} />
      </div>
      <div className="input_container">
        <input
          className="message_input"
          onChange={props.handleChange}
          placeholder="insert message here"
        />
        <button className="message_send_btn" onClick={props.handleMessageEmit}>
          sent message
        </button>
      </div>
    </div>
  )
}

export default CurrentChat
