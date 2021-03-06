import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import MapIcon from '@material-ui/icons/Map'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Spinner from './Spinner.jsx'
import { store, startState } from '../../redux/_store'
import { remove_user } from '../../redux/_actions'
import api from '../../apis/auth_api'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    paddingRight: 20,
    overflowY: 'hidden',
    boxSizing: 'content-box',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: 'linear-gradient(to left, #feda6a , #ffc222);',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
  },
}))

export default function UserHomeNavigator(props) {
  const [user, setUser] = useState(store.getState().user)
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawer = () => setOpen(!open)

  const handleLogout = () => {
    api.logout()
    store.dispatch(remove_user(null))
    props.history.push('/')
  }

  const handleRoute = routename => props.history.push(`/${routename}`)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome {user.username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['map', 'my meetups', 'create meetup', 'friends', 'chat'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <MapIcon
                      color={
                        props.activeIndex === index ? 'secondary' : 'disabled'
                      }
                      onClick={() => handleRoute('userhome')}
                    />
                  ) : null}
                  {index === 1 ? (
                    <ListAltIcon
                      color={
                        props.activeIndex === index ? 'secondary' : 'disabled'
                      }
                      onClick={() => handleRoute('meetuplist')}
                    />
                  ) : null}

                  {index === 2 ? (
                    <EditLocationIcon
                      color={
                        props.activeIndex === index ? 'secondary' : 'disabled'
                      }
                      onClick={() => {
                        props.setshowMeetupForm(!props.showMeetupForm)
                      }}
                    />
                  ) : null}
                  {index === 3 ? (
                    <PeopleIcon
                      color={
                        props.activeIndex === index ? 'secondary' : 'disabled'
                      }
                      onClick={() => handleRoute('friendspage')}
                    />
                  ) : null}
                  {index === 4 ? (
                    <ChatIcon
                      color={
                        props.activeIndex === index ? 'secondary' : 'disabled'
                      }
                      onClick={() => handleRoute('chatpage')}
                    />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {['my profile', 'logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <AccountCircleIcon />
                ) : (
                  <ExitToAppIcon onClick={handleLogout} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  )
}
