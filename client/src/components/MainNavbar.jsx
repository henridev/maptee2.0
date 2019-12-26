import React, { useEffect } from 'react'
import api from '../apis/auth_api'
import logo from '../logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { store, startState } from '../redux/_store'
import { remove_user } from '../redux/_actions'

function MainNavbar(props) {
  console.log(props.user, api.isLoggedIn(), 'here')
  function handleLogoutClick(e) {
    api.logout()
    store.dispatch(remove_user())
  }
  return (
    <nav className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">MERN Boilerplate</h1>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/countries">Countries</NavLink>
      <NavLink to="/add-country">Add country</NavLink>
      {!props.user && !api.isLoggedIn() && (
        <NavLink to="/signup">Signup</NavLink>
      )}
      {!props.user && !api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
      {api.isLoggedIn() && (
        <Link to="/" onClick={handleLogoutClick}>
          Logout
        </Link>
      )}
    </nav>
  )
}

export default withRouter(MainNavbar)
