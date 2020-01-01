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

export { getCurrentLocation }
