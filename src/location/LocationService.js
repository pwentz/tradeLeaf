export default class LocationService {
  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          resolve({lat: coords.latitude, lng: coords.longitude})
        },
        reject
      )
    })
  }
}
