import React, { createRef } from 'react'

/**
 * Props:
 * zoom : 13 - higher the number, the more zoomed the map is on center
 * center: {lat:0.0, lng:0.0} - coordinates for center of map
 */


class Map extends React.Component {
  
  componentDidMount() {
    const loadGoogleMapScript = document.createElement('script');
    loadGoogleMapScript.src =
     'https://maps.googleapis.com/maps/api/js?key=AIzaSyAoxC_RWciy_EVsxVImCWk09xFhWf6AwgY&libraries=place';
    
    window.document.body.appendChild(loadGoogleMapScript);

    loadGoogleMapScript.addEventListener('load', () => {
      this.googleMap = this.createMap();
    });
  }

  googleMapRef = createRef();
  createMap() {
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom,
      center: this.props.center,
    })
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