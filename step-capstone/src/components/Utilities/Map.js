import React, { createRef } from 'react'
import { travelObjectStartDateComparator } from "../../scripts/HelperFunctions"

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
    this.googleMap = this.createMap();

    if (this.props.finalized.length > 0 || this.props.unfinalized > 0) {
      let bounds = this.drawMap();
      this.googleMap.fitBounds(bounds);
    }

    this.props.setMap(this.googleMap);
  }

  /*
   * Updates state with any changes in props
   */
  componentDidUpdate(prevProps) {
    if (this.props.selected !== null && this.props.selected !== prevProps.selected) {
      let selectedObject = this.state.finalizedMarkers.has(this.props.selected)
        ? this.state.finalizedMarkers.get(this.props.selected)
        : this.state.unfinalizedMarkers.get(this.props.selected);

      let marker = selectedObject.type === "flight" ? selectedObject.marker.arrival : selectedObject.marker;
      this.zoomToMarker(marker);
    }
    if (prevProps.displayDate.date !== this.props.displayDate.date && this.props.displayDate.events.length !== 0) {
      this.clearMap()
      this.drawMap();
      this.googleMap.fitBounds(this.getTodaysBounds());
    } else if (prevProps.finalized !== this.props.finalized || prevProps.unfinalized !== this.props.unfinalized) {
      this.clearMap();
      let bounds = this.drawMap();
      if (this.props.displayDate.events.length === 0) {
        if (this.props.finalized.length == 0 && this.props.unfinalized.length == 0) {
          this.zoomToDefaultCoordinates();
        } else {
          this.googleMap.fitBounds(bounds);
        }
      } else {
        this.googleMap.fitBounds(this.getTodaysBounds());
      }
    }
  }

  zoomToDefaultCoordinates() {
    this.googleMap.setZoom(15);
    this.googleMap.setCenter(this.props.defaultCenter);
  }

  zoomToMarker(marker) {
    this.googleMap.setZoom(25);
    this.googleMap.setCenter(marker.getPosition());
  }

  getTodaysBounds() {
    var bounds = new window.google.maps.LatLngBounds();
    this.props.displayDate.events.map((event) => {
      if (event.type === "flight") {
        bounds.extend(event.arrivalCoordinates);
      } else {
        bounds.extend(event.coordinates);
      }
    })
    return bounds;
  }

  sortList(list) {
    return list.sort(travelObjectStartDateComparator)
  }

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.props.zoom,
      center: this.props.defaultCenter
    })
  }

  drawMap() {
    var bounds = new window.google.maps.LatLngBounds();

    let unfinalizedMarkers = this.drawMarkers(this.props.unfinalized, bounds);
    let finalizedMarkers = this.drawMarkers(this.sortList(this.props.finalized), bounds);

    let pathArr = this.drawPaths();

    this.setState({
      unfinalizedMarkers: unfinalizedMarkers,
      finalizedMarkers: finalizedMarkers,
      geoPaths: pathArr
    });

    return bounds;
  }

  /* 
   * Given a list of travel object data, draws corresponding markers on map and 
   * returns hash map containing marker objects 
   */
  drawMarkers(list, bounds) {
    // construct hashmap with key: travelObject id, value: marker object
    return list.reduce((objectIDToMarker, item) => {
      if (item.type !== "flight") {
        objectIDToMarker.set(item.id, { marker: this.addMarker(item.coordinates, item.type), type: item.type });
        bounds.extend(item.coordinates);
      } else {
        objectIDToMarker.set(item.id, {
          marker: {
            departure: this.addMarker(item.departureCoordinates, item.type),
            arrival: this.addMarker(item.arrivalCoordinates, item.type)
          },
          type: item.type
        });

        bounds.extend(item.departureCoordinates);
        bounds.extend(item.arrivalCoordinates);
      }
      return objectIDToMarker;
    }, new Map())
  }

  addMarker(coordinates, type) {
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
    });

    return newMarker;
  }

  /*
   *  Draws path between all finalized travel objects, returns list of path objects
   */
  drawPaths() {
    let paths = this.getPathSegments();

    // add each path to the map and return array of path objects
    var red = 60;
    let change = paths.length === 0 ? 0 : red / (paths.length - 1);
    return paths.map((path) => {
      let color = "hsl(0, 100%, " + red + "%)";
      red -= change;
      return this.addPath(this.googleMap, path, color);
    })
  }

  // splits finalized trips into segments of coordinate pairs
  getPathSegments() {
    var paths = [];
    var curPath = [];

    for (let i = 0; i < this.props.displayDate.events.length; i++) {
      let item = this.props.displayDate.events[i];
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

    return paths;
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

  clearMap() {
    this.removeAllMarkers(this.state.unfinalizedMarkers);
    this.removeAllMarkers(this.state.finalizedMarkers);

    // remove all paths
    this.state.geoPaths.map((path) => path.setMap(null));
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