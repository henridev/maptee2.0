import React, { useState } from 'react'
import api from '../../apis/auth_api'
import { store, startState } from '../../redux/_store'
import { set_user } from '../../redux/_actions'
import DragDropFile from '../sub_components/landing/DragDropFile'

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

  function handleFileChange_btn(e) {
    setState({ ...state, avatar: e.target.files[0] })
  }

  function handleFileChange(file) {
    setState({ ...state, avatar: file })
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
        console.log('SUCCESS!', user)
        store.dispatch(set_user(user))
        props.history.push('/userhome') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }

  return (
    <div className="Signup">
      <div className="signup_container">
        <h2>Discover eachother</h2>
        <form className="signup_form">
          <div className="name_wrapper">
            <input
              placeholder="firstname"
              type="text"
              value={state.firstName}
              name="firstName"
              onChange={handleInputChange}
            />
            <input
              placeholder="lastname"
              type="text"
              value={state.lastName}
              name="lastName"
              onChange={handleInputChange}
            />
          </div>
          <input
            placeholder="username"
            type="text"
            value={state.username}
            name="username"
            onChange={handleInputChange}
          />

          <input
            placeholder="email"
            type="text"
            value={state.email}
            name="email"
            onChange={handleInputChange}
          />

          <input
            placeholder="password"
            type="password"
            value={state.password}
            name="password"
            onChange={handleInputChange}
          />

          <DragDropFile handleFileChange={handleFileChange}>
            <input
              type="file"
              // value={state.file}
              name="file"
              id="file"
              onChange={handleFileChange_btn}
              className="inputs-edit-file"
            />
            <label for="file">drop an avatar</label>
          </DragDropFile>
          <button
            className="btn btn-warning btn-block ng-scope"
            onClick={e => handleClick(e)}
          >
            Signup
          </button>
        </form>
      </div>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </div>
  )
}
