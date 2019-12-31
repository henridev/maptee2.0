import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import BottomNavigator from './sub_components/BottomNavigator'
import Landing from './pages/LandingPage'
import UserHome from './pages/UserHome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { store, startState } from '../redux/_store'
import { set_user } from '../redux/_actions'
import api from '../apis/auth_api'

export default function App(props) {
  const [user, setUser] = useState(api.getLocalStorageUser().user)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().user)
      console.log(store.getState().user, 'new state')
    })
    return unsubscribe
  }, [])
  return (
    <div className="App" id="bootstrap-overrides">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/userhome" exact component={UserHome} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      {!user && <BottomNavigator user={user} />}
    </div>
  )
}
