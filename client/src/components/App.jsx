import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './pages/LandingPage'
import UserHome from './pages/UserHome'
import MeetupList from './pages/MeetupList'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyComponent from './maps/OverviewMap'
import { store, startState } from '../redux/_store'
import { set_user, set_meetups } from '../redux/_actions'
import api from '../apis/auth_api'

export default function App(props) {
  return (
    <div className="App" id="bootstrap-overrides">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/userhome" component={UserHome} />
        <Route path="/meetuplist" component={MeetupList} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/test" component={MyComponent}></Route>
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
