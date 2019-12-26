import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import color from '../assets/colors/colors.js'
import { store, startState } from '../redux/_store'
import api from '../apis/auth_api'
import { remove_user } from '../redux/_actions'

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: 'space-evenly',
    boxShadow: '0 0 6px rgba(0,0,0,.12)',
    height: '100%',
    alignItems: 'center',
  },
  wrapper: {
    color: color.ya_yellow,
  },
})

export default function BottomNavigator(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleLogoutClick(e) {
    api.logout()
    store.dispatch(remove_user())
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={classes.root}
      id="bottom_navigator"
    >
      <NavLink to="/" exact>
        <BottomNavigationAction
          className={classes.wrapper}
          label="home"
          icon={<HomeIcon />}
          showLabel={true}
        />
      </NavLink>
      {props.user == null && !api.isLoggedIn() && (
        <NavLink to="/signup">
          <BottomNavigationAction
            className={classes.wrapper}
            label="signup"
            icon={<CreateIcon />}
            showLabel={true}
          />
        </NavLink>
      )}
      {!api.isLoggedIn() && (
        <NavLink to="/login">
          <BottomNavigationAction
            className={classes.wrapper}
            label="login"
            icon={<AccountCircleIcon />}
            showLabel={true}
          />
        </NavLink>
      )}
      {api.isLoggedIn() && (
        <Link to="/" onClick={handleLogoutClick}>
          <BottomNavigationAction
            className={classes.wrapper}
            label="logout"
            icon={<ExitToAppIcon />}
            showLabel={true}
          />
        </Link>
      )}
    </BottomNavigation>
  )
}
