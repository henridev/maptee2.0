import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { store, startState } from '../redux/_store'
import { set_user } from '../redux/_actions'

export default function App() {
  const [user, setUser] = useState(store.getState().user)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().user)
      console.log(store.getState(), 'new state')
    })
    return unsubscribe
  }, [])
  return (
    <div className="App">
      <MainNavbar user={user} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
