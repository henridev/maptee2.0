import React from 'react'
import Fab from '@material-ui/core/Fab'

export default function Button(props) {
  return (
    <div className="wrap" onClick={props.onClick}>
      <Fab color="primary" aria-label="add">
        {props.icon}
      </Fab>
      {props.children}
    </div>
  )
}
