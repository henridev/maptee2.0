import React, { useState } from 'react'
import api from '../../apis/auth_api'
import GoogleSignIn from '../sub_components/GoogleSignIn'

import { useForm } from '../../hooks'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({
    username: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(user => {
        console.log('SUCCESS!')
        store.dispatch(set_user(user))
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        Username: <input type="text" {...getInputProps('username')} /> <br />
        Password: <input type="password" {...getInputProps('password')} />
        <br />
        <button>Login</button>
      </form>
      <GoogleSignIn />
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
