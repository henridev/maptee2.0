import React from 'react'
import Avatar from '@material-ui/core/Avatar'

export default function AvatarList(props) {
  const renderAvatars = () => {
    const friendChat = props.chats.filter(chat => !chat.isGroupChat)
    return friendChat.map(({ _users }) => {
      return (
        <Avatar
          src={_users[0].avatar_url}
          style={{ width: 100, height: 100 }}
        ></Avatar>
      )
    })
  }
  return <div className="avatar_list">{renderAvatars()}</div>
}
