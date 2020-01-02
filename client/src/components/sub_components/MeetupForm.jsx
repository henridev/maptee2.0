import React, { useState } from 'react'
import { useForm } from '../../hooks'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateTimeSelection from './DateTimeSelection'
import LocationSearch from '../maps/LocationSearchBox'
import api from '../../apis/meetup_api'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: 'yellow',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

export default function MeetupForm() {
  const { formValues, getInputProps, handleChange } = useForm({
    name: '',
    description: '',
  })
  const [_suggested_locations, set_suggested_locations] = useState(null)
  const [_departure_locations, set_departure_locations] = useState(null)
  const [selectedDate, handleDateChange] = useState(new Date())
  const classes = useStyles()

  const handleSubmit = e => {
    e.preventDefault()
    api
      .addMeetup({
        ...formValues,
        _suggested_locations,
        _departure_locations,
        meetup_date: selectedDate,
      })
      .then(newMeetup => {
        console.log(newMeetup)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="meetup_form_wrapper">
      <form
        className="meetup_form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Create a new meetup</h2>
        <div>
          <TextField
            id="filled-multiline-flexible"
            label="name"
            name="name"
            rowsMax="4"
            value={formValues.name}
            onChange={handleChange}
            variant="outlined"
            placeholder="name"
            className={classes.textField}
          />
          <div>
            <TextField
              id="filled-multiline-static"
              label="description"
              multiline
              rows="4"
              variant="outlined"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className={classes.textField}
            />
          </div>
          <DateTimeSelection
            label="meetup date and time"
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <div style={{ height: 40 }}>
            <LocationSearch
              set_departure_locations={set_departure_locations}
              placeholder="your departure"
              backgroundColor="#fbf2e7"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-warning ng-scope">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
