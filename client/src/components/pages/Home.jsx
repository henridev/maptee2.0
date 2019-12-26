import React, { useEffect, useState } from 'react'
import api from '../../apis/auth_api'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'
import UserWelcome from '../sub_components/UserWelcome'

export default function Home(props) {
  const user = store.getState().user
  useEffect(() => {
    if (!api.isLoggedIn()) {
      try {
        api.google_signup().then(user => {
          console.log(user)
          store.dispatch(set_user(user))
        })
      } catch (err) {
        console.error(err)
      }
    }
  }, [])

  return (
    <div className="Home">
      <h2>Home</h2>
      <p>welcome to "App_name"</p>
      {user != null && <UserWelcome />}
    </div>
  )
}
