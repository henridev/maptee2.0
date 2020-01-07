import React from 'react'
import { InfoBox } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { sumLat, sumLng } from '../../utils/GeoFunctions'

export default function MeetupInfoWindows({
  positions,
  setmeetups,
  setselectedmeetup,
}) {
  const meetups = store.getState().meetups
  console.log(meetups, 'meetupssss')
  if (!meetups) {
    return null
  }

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const handleClick = e => {
    console.log(e, 'infobox clicked')
    const meetupid = e.target.dataset.id
    const clicked_meetup = meetups.find(meetup => meetup.id === meetupid)
    setselectedmeetup(clicked_meetup)
  }

  const meetupinfo = meetups.map((meetup, i) => {
    console.log(meetup, 'meetup info')
    let lat
    let lng
    try {
      lat =
        meetup._departure_locations.reduce(sumLat, 0) +
        meetup._suggested_locations.reduce(sumLat, 0) / 2
      lng =
        meetup._departure_locations.reduce(sumLng, 0) +
        meetup._suggested_locations.reduce(sumLng, 0) / 2
    } catch (err) {
      lat = meetup._departure_locations.reduce(sumLat, 0)
      lng = meetup._departure_locations.reduce(sumLng, 0)
    }
    const name = meetup.name
    const description = meetup.description
    const date_time = new Date(meetup.meetup_date).toLocaleString().split(' ')
    const [date, time] = date_time
    const id = meetup.id
    return {
      position: { lat, lng },
      name,
      description,
      date,
      time,
      id,
    }
  })

  return meetupinfo.map((info, i) => (
    <InfoBox options={options} position={info.position} key={i}>
      <div className="infobox" onClick={handleClick} data-id={info.id}>
        <h3 className="infobox_title">{info.name}</h3>
        <b>date: {info.date}</b>
        <br />
        <b>time: {info.time}</b>
        <p className="infobox_description">{info.description}</p>
      </div>
    </InfoBox>
  ))
}
