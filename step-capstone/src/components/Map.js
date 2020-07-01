import React, { createRef } from 'react'

/**
 * Props:
 * zoom : 13 - higher the number, the more zoomed the map is on center
 * center: {lat:0.0, lng:0.0} - coordinates for center of map
 */

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalizedMarkers: new Map(),
      unfinalizedMarkers: new Map(),
      geoPaths: []
    }
    this.googleMapRef = createRef();
    this.googleMap = undefined
  }

  componentDidMount() {
    const loadGoogleMapScript = document.createElement('script');
    loadGoogleMapScript.src =
      'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY + '&libraries=place';

    window.document.body.appendChild(loadGoogleMapScript);

    loadGoogleMapScript.addEventListener('load', () => {
      this.googleMap = this.createMap();
      let bounds = this.drawMap()
      this.googleMap.fitBounds(bounds);
    });
  }

  /*
   * Updates state with any changes in props
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.clearMap();
      this.drawMap();
    }
  }

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom,
      center: this.props.center,
    })
  }

  addMarker(coordinates, type, label) {
    // TODO: firebase will provide coordinates as a GeoPoint --> convert to {lat, lng}
    // { lat: coordinates.lat(), lng: coordinates.lng() }

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
      map: this.googleMap,
      animation: window.google.maps.Animation.DROP,
      icon: { url: iconUrl }
    })

    // zoom to marker when clicked
    newMarker.addListener('click', () => {
      this.googleMap.setZoom(15);
      this.googleMap.setCenter(newMarker.getPosition());

      // TODO: this.props.onMarkerClicked(id) --> notifies parent that marker clicked
    });

    return newMarker;
  }

  // constructs path object and places on map. Returns path object.
  addPath(map, path, color) {
    // TODO : change to show directions between paths
    // dotted line
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    
    let geoPath = new window.google.maps.Polyline({
      path: path,
      strokeColor: color,
      strokeOpacity: 0,
      strokeWeight: 5,
      icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }]
    });

    geoPath.setMap(map);

    return geoPath;
  }

  /* 
   * Given a list of travel object data, draws corresponding markers on map and 
   * returns hash map containing marker objects 
   */
  drawMarkers(list, bounds) {
    // construct hashmap with key: travelObject id, value: marker object
    return list.reduce((hashMap, item) => {
      if (item.type !== "flight") {
        hashMap.set(item.id, {marker: this.addMarker(item.coordinates, item.type, item.id), type: item.type});
        bounds.extend(item.coordinates);
      } else {
        hashMap.set(item.id, {
          marker: {
            departure: this.addMarker(item.departureCoordinates, item.type, item.id),
            arrival: this.addMarker(item.arrivalCoordinates, item.type, item.id)
          }, type: item.type});

        bounds.extend(item.departureCoordinates);
        bounds.extend(item.arrivalCoordinates);
      }
      return hashMap;
    }, new Map())
  }

  /*
   *  Draws path between all finalized travel objects, returns list of path objects
   */
  drawPaths() {
    // Separate into different segments
    var paths = [];
    var curPath = [];

    for (let i = 0; i < this.props.finalized.length; i++) {
      let item = this.props.finalized[i];

      // found flight -> create new path segment
      if (item.type === "flight") {
        if (paths.length !== 0) {
          curPath.push(item.departureCoordinates)
          paths.push(curPath);
        }
        curPath = [item.arrivalCoordinates];
      } else {
        curPath.push(item.coordinates);
        paths.push(curPath);
        curPath = [item.coordinates];
      }
    }

    // add remaining path, if any, to paths
    if (curPath.length > 1) {
      paths.push(curPath);
    }

    // add each path to the map and return array of path objects
    var red = 60;
    let change = paths.length === 0 ? 0 : red / (paths.length - 1);
    return paths.map((path) => {
      let color = "hsl(0, 100%, " + red + "%)";
      red -= change;
      return this.addPath(this.googleMap, path, color);
    })
  }

  drawMap() {
    var bounds = new window.google.maps.LatLngBounds();

    let unfinalizedMarkers = this.drawMarkers(this.props.unfinalized, bounds);
    let finalizedMarkers = this.drawMarkers(this.props.finalized, bounds);

    let pathArr = this.drawPaths();

    this.setState({
      unfinalizedMarkers: unfinalizedMarkers,
      finalizedMarkers: finalizedMarkers,
      geoPaths: pathArr
    });

    return bounds;
  }

  removeAllMarkers(hashMap) {
    for (const [key, value] of hashMap) {
      if (value.type !== "flight") {
        value.marker.setMap(null);
      } else {
        value.marker.departure.setMap(null);
        value.marker.arrival.setMap(null);
      }
    }
  }

  clearMap() {
    this.removeAllMarkers(this.state.unfinalizedMarkers);
    this.removeAllMarkers(this.state.finalizedMarkers);

    // remove all paths
    this.state.geoPaths.map((path) => path.setMap(null));
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

export default MapComponent;