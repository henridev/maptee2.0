import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}))

export default function MeetupCard({ meetup }) {
  const classes = useStyles()
  console.log(meetup)
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {meetup.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6"></Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {meetup.description}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Friends joining
        </Typography>
        <div style={{ display: 'flex' }}>
          {meetup._users.map(user => {
            const imgurl = user.avatar_url
            return <Avatar alt="user" src={imgurl} />
          })}
        </div>
      </div>
      <div className={classes.section3}>
        <Button color="primary">go to meetup</Button>
      </div>
    </div>
  )
}
