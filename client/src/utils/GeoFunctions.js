function getCurrentLocation(setposition) {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(function(position) {
      const lat = Number(position.coords.latitude)
      const lng = Number(position.coords.longitude)
      console.log(lat)
      return setposition({ lat, lng })
    })
  }
}

const sumLat = (accumulator, departureORsuggestion) =>
  departureORsuggestion._location.coordinates[0] + accumulator

const sumLng = (accumulator, departureORsuggestion) =>
  departureORsuggestion._location.coordinates[1] + accumulator

export { getCurrentLocation, sumLat, sumLng }
