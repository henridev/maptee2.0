import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { OverlayView } from '@react-google-maps/api'
import { store } from '../../redux/_store'
import { sumLat, sumLng } from '../../utils/GeoFunctions'

export default function DepartureMeetupMarkers({ locations }) {
  return locations.map((departure, i) => {
    const creator_name = departure._creator.username
    const avatar_url = departure._creator.avatar_url
    const lat = departure._location.coordinates[0]
    const lng = departure._location.coordinates[1]
    return (
      <OverlayView
        position={{ lat, lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="departure_marker_container">
          <Avatar
            alt={creator_name}
            src={avatar_url}
            style={{ width: 50, height: 50, border: '2px solid yellow' }}
          />
          <h5>{creator_name}</h5>
        </div>
      </OverlayView>
    )
  })
}
