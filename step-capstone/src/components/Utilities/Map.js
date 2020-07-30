import React, { createRef } from 'react'
import { sortTravelObjectsByDate, sameTravelObjectList } from "../../scripts/HelperFunctions"

const MARKER_ZOOM = 15;
const CENTER_ZOOM = 12;

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
    } else if (!sameTravelObjectList(prevProps.displayDate.events, this.props.displayDate.events) && this.props.displayDate.events.length !== 0) {
      // if changes to current day's events and isn't empty, zoom to todays events
      this.clearMap()
      this.drawMap();
      this.googleMap.fitBounds(this.getTodaysBounds());
      this.googleMap.setZoom(this.googleMap.getZoom() - 1);
    } else if (!sameTravelObjectList(prevProps.finalized, this.props.finalized) || !sameTravelObjectList(prevProps.unfinalized, this.props.unfinalized)) {
      // any other changes to finalized or unfinalized zoom out to encompass all markers.
      this.clearMap();
      let bounds = this.drawMap();
      // if there are no travel objects, set map to default trip location
      if (this.props.finalized.length == 0 && this.props.unfinalized.length == 0) {
        this.zoomToDefaultCoordinates();
      } else {
        // no finalized events for current display date, set bounds to encompass all markers
        this.googleMap.fitBounds(bounds);
      }
    }
  }

  zoomToDefaultCoordinates() {
    this.googleMap.setZoom(CENTER_ZOOM);
    this.googleMap.setCenter(this.props.defaultCenter);
  }

  zoomToMarker(marker) {
    this.googleMap.setZoom(MARKER_ZOOM);
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

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: CENTER_ZOOM,
      center: this.props.defaultCenter
    })
  }

  drawMap() {
    var bounds = new window.google.maps.LatLngBounds();

    let unfinalizedMarkers = this.drawMarkers(this.props.unfinalized, bounds);
    let finalizedMarkers = this.drawMarkers(sortTravelObjectsByDate(this.props.finalized), bounds);

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
        objectIDToMarker.set(item.id, { marker: this.addMarker(item.coordinates, item.type, item.title), type: item.type });
        bounds.extend(item.coordinates);
      } else {
        objectIDToMarker.set(item.id, {
          marker: {
            departure: this.addMarker(item.departureCoordinates, item.type, item.departureAirport),
            arrival: this.addMarker(item.arrivalCoordinates, item.type, item.arrivalAirport)
          },
          type: item.type
        });

        bounds.extend(item.arrivalCoordinates);
      }
      return objectIDToMarker;
    }, new Map())
  }

  addMarker(coordinates, type, content) {
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

    const infowindow = new window.google.maps.InfoWindow({ content: content })

    // zoom to marker when clicked
    newMarker.addListener('click', () => {
      this.googleMap.setZoom(MARKER_ZOOM);
      this.googleMap.setCenter(newMarker.getPosition());
      infowindow.open(this.googleMap, newMarker)
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
    let todaysHotel = this.props.date2HotelMap.get(this.props.displayDate.date)
    var paths = [];
    // if stayed at hotel overnight, start day at hotel.
    var curPath = todaysHotel !== undefined && todaysHotel.morningHotel !== undefined ? [todaysHotel.morningHotel.coordinates] : [];

    for (let i = 0; i < this.props.displayDate.events.length; i++) {
      let item = this.props.displayDate.events[i];
      // don't include hotel checkin time/checkout time as part of route
      if (item.type !== "hotel") {
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
    }

    // If staying in hotel that night, add to route as final destination
    if (todaysHotel !== undefined && todaysHotel.nightHotel !== undefined) {
      curPath.push(todaysHotel.nightHotel.coordinates);
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