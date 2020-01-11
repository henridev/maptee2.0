import React, { useState, useEffect } from 'react'
import api from '../../apis/auth_api'
import GoogleSignIn from '../sub_components/landing/GoogleSignIn'
import FacebookLoginButton from 'react-facebook-login'
import { useForm } from '../../hooks'
import { store } from '../../redux/_store'
import { set_user, set_meetups } from '../../redux/_actions'
import { Link } from 'react-router-dom'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({
    username: '',
    password: '',
  })

  const updateStore = user => {
    console.log('SUCCES', user)
    try {
      store.dispatch(set_meetups(user.user._meetups))
      store.dispatch(set_user(user.user))
    } catch {
      store.dispatch(set_meetups(user._meetups))
      store.dispatch(set_user(user))
    }
    console.log('dispatched', user)
    props.history.push('/userhome')
  }

  const responseFacebook = userprofile => {
    api
      .facebookLogin(userprofile)
      .then(user => {
        updateStore(user)
      })
      .catch(err => console.error(err))
  }

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(user => {
        updateStore(user)
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="Login">
      <div className="title">
        <h2>MapT</h2>
        <p>Meet your friends!</p>
      </div>
      <div className="login_wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            {...getInputProps('username')}
            placeholder="username"
          />{' '}
          <input
            type="password"
            {...getInputProps('password')}
            placeholder="password"
          />
          <button className="btn btn-warning btn-block ng-scope">Login</button>
        </form>
        <h2>or</h2>
        <div className="social_wrapper">
          <GoogleSignIn />
          <FacebookLoginButton
            appId="750494372119711"
            // autoLoad={true}
            fields="name,email,picture"
            onClick={() => {}}
            callback={responseFacebook}
            cssClass="facebook-button"
          />
        </div>
        <span class="signup_message">
          Not on Mapt? <Link to="/signup">sign up</Link>
        </span>
      </div>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
