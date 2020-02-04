import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge)

export default function AvatarList(props) {
  const renderAvatars = () => {
    return props.chats.map(({ _users, _id }) => {
      // console.log('---', _id, props.currentChatID)
      return (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
          onClick={() => {
            if (_id !== props.currentChatID) {
              props.changeChat(_id)
            }
          }}
        >
          <Avatar
            className={
              props.currentChatID === _id ? 'active_chat_avatar' : 'chat_avatar'
            }
            src={_users[0].avatar_url}
            style={{ width: 80, height: 80 }}
          ></Avatar>
        </StyledBadge>
      )
    })
  }
  return <div className="avatar_list">{renderAvatars()}</div>
}
