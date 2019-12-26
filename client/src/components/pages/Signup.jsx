import React, { useState } from 'react'
import api from '../../apis/auth_api'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'

export default function Signup(props) {
  const [state, setState] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    avatar: false,
    message: null,
  })

  function handleFileChange(event) {
    console.log('the file added by the user is: ', event.target.files[0])
    setState({ ...state, avatar: event.target.files[0] })
  }

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      username: state.username,
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      password: state.password,
      avatar: state.avatar,
    }
    api
      .signup(data)
      .then(user => {
        console.log('SUCCESS!')
        store.dispatch(set_user(user))
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form>
        <input
          placeholder="username"
          type="text"
          value={state.username}
          name="username"
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="email"
          type="text"
          value={state.email}
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="firstname"
          type="text"
          value={state.firstName}
          name="firstName"
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="lastname"
          type="text"
          value={state.lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="password"
          type="password"
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="file"
          // value={state.file}
          name="avatar"
          onChange={handleFileChange}
          className="inputs-edit-file"
        />
        <br />
        <button onClick={e => handleClick(e)}>Signup</button>
      </form>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </div>
  )
}
