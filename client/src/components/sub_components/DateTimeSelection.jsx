import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

export default function DateTimePick({
  selectedDate,
  handleDateChange,
  label,
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        value={selectedDate}
        disablePast
        onChange={handleDateChange}
        label={label}
        variant="inline"
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  )
}
