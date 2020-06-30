import React, { createRef } from 'react'

/**
 * Props:
 * zoom : 13 - higher the number, the more zoomed the map is on center
 * center: {lat:0.0, lng:0.0} - coordinates for center of map
 */


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [
        {
          lat: 51.511645,
          lng: -0.131944
        },
        {
          lat: 51.509963,
          lng: -0.129336
        }
      ]
    }
    this.googleMapRef = createRef();
  }
  
  componentDidMount() {
    console.log("mounting")
    const loadGoogleMapScript = document.createElement('script');
    loadGoogleMapScript.src =
     'https://maps.googleapis.com/maps/api/js?key='+process.env.REACT_APP_API_KEY+'&libraries=place';
    
    window.document.body.appendChild(loadGoogleMapScript);

    loadGoogleMapScript.addEventListener('load', () => {
      var googleMap = this.createMap();
      let bounds = this.addMarkers(googleMap)
      googleMap.fitBounds(bounds);
    });
  }

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom,
      center: this.props.center,
    })
  }

  addMarkers(map) {
    var bounds = new window.google.maps.LatLngBounds();
    this.state.coordinates.map((coord) => {
      console.log(coord)
      new window.google.maps.Marker({
        position: coord,
        map: map,
        animation: window.google.maps.Animation.DROP
      })
      bounds.extend(coord)
    })
    return bounds;
  }

  render() {
    return(
      <div
        id = 'map'
        ref = {this.googleMapRef}
      />
    )
  }
}

export default Map