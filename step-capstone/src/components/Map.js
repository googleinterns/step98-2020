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
      finalized: this.props.finalized,
      unfinalized: this.props.unfinalized
    }
    this.googleMapRef = createRef();
  }

  componentDidMount() {
    const loadGoogleMapScript = document.createElement('script');
    loadGoogleMapScript.src =
      'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY + '&libraries=place';

    window.document.body.appendChild(loadGoogleMapScript);

    loadGoogleMapScript.addEventListener('load', () => {
      this.googleMap = this.createMap();
      let bounds = this.drawMap(this.googleMap)
      this.googleMap.fitBounds(bounds);
    });
  }

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom,
      center: this.props.center,
    })
  }

  addMarker(map, coordinates, bounds, type) {
    bounds.extend(coordinates);

    var iconUrl;
    if (type === "flight") {
      iconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    } else if (type === "event") {
      iconUrl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    } else {
      iconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }

    var newMarker = new window.google.maps.Marker({
      position: coordinates,
      map: map,
      animation: window.google.maps.Animation.DROP,
      icon: {url: iconUrl}
    })

    // zoom to marker when clicked
    newMarker.addListener('click', function() {
      map.setZoom(15);
      map.setCenter(newMarker.getPosition());
    });

    return newMarker;
  }

  drawPath(map, path) {
    // dotted line
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    
    let geoPath = new window.google.maps.Polyline({
      path: path.path,
      strokeColor: '#FF0000',
      strokeOpacity: path.type === "normal" ? 0.0 : 1.0,
      icons: path.type === "normal"
        ? [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }]
        : [],
      strokeWeight: 2,
    });

    geoPath.setMap(map);

    return geoPath;
  }

  drawMap(map) {
    var bounds = new window.google.maps.LatLngBounds();

    // unfinalized places are disconnected markers
    this.geoMarkers = this.state.unfinalized.map((item) => {
      this.addMarker(map, item.coordinates, bounds, item.type)
    })

    // Connect finalized components
    // First: separate into different segments: flight vs non-flight
    var paths = []
    var curPath = []
    
    for (let i = 0; i < this.state.finalized.length; i++) {
      let item = this.state.finalized[i];

      // found flight -> create new path segment
      if (item.type === "flight") {
        if (paths.length !== 0) {
          curPath.push(item.departureCoordinates)
          paths.push({path: curPath, type: "normal"});
          curPath = [];
        }
        curPath.push(item.departureCoordinates);
        curPath.push(item.arrivalCoordinates);

        paths.push({path: curPath, type: "flight"});

        // start of next path is arrival location of flight
        curPath = [item.arrivalCoordinates];
        
        this.addMarker(map, item.departureCoordinates, bounds, item.type);
        this.addMarker(map, item.arrivalCoordinates, bounds, item.type);
      } else {
        curPath.push(item.coordinates);
        this.addMarker(map, item.coordinates, bounds, item.type);
      }
    }

    if (curPath.length > 1) {
      paths.push({path: curPath, type: "normal"});
    }
    
    // Add all paths to map
    this.geoPaths = paths.map((path) => {
      return this.drawPath(map, path);
    })

    return bounds;
  }

  render() {
    return (
      <div
        id='map'
        ref={this.googleMapRef}
      />
    )
  }
}

export default Map