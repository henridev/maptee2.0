import React, { useEffect, useState } from 'react'
import api from '../../apis/auth_api'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'

export default function UserWelcome(props) {
  const user = store.getState().user
  console.log(user)
  return (
    <div className="Home">
      <p>Hello there! {user.username}</p>
    </div>
  )
}
