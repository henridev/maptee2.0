import React from 'react'
import UserHomeNavigator from '../sub_components/UserHomeNavigator'
import Map from '../sub_components/Map'

export default function UserWelcome(props) {
  return (
    <div>
      <UserHomeNavigator>
        <Map />
      </UserHomeNavigator>
    </div>
  )
}
