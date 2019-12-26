import React, { useEffect, useState } from 'react'
import api from '../../apis/auth_api'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'

export default function Home(props) {
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
      <p>This is a sample project with the MERN stack</p>
    </div>
  )
}
