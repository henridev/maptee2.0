import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Spinner from './sub_components/Spinner'
import Landing from './pages/LandingPage'
import UserHome from './pages/UserHome'
import MeetupPage from './pages/MeetupPage'
import FriendsPage from './pages/FriendsPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatPage from './pages/ChatPage'
import { store, startState } from '../redux/_store'
import { set_user, set_meetups } from '../redux/_actions'
import api from '../apis/auth_api'

export default function App(props) {
  const [isUser, setIsUser] = useState(false)
  useEffect(() => {
    // only in case of google signup we need to set the state here
    // for facebook and local we can set these states in login
    if (!api.isLoggedIn()) {
      console.log('here')
      try {
        api.google_signup().then(user => {
          console.log('google signup', user)
          store.dispatch(set_user(user.user))
          store.dispatch(set_meetups(user.user._meetups))
        })
      } catch (err) {
        console.error(err)
      }
    }
    const unsubscribe = store.subscribe(() => {
      if (!isUser) {
        setIsUser(true)
      }
    })
  }, [])

  return (
    <div className="App" id="bootstrap-overrides">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/userhome" component={!isUser ? Spinner : UserHome} />
        <Route path="/meetuplist" component={!isUser ? Spinner : MeetupPage} />
        <Route
          path="/friendspage"
          component={!isUser ? Spinner : FriendsPage}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/chatpage" component={ChatPage}></Route>
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
