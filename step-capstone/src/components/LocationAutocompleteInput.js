import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { TextField, Typography } from "@material-ui/core"

export default class LocationAutocompleteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: this.props.text === undefined ? "" : this.props.text,
            bounds: new window.google.maps.LatLngBounds()
        };
    }

    componentDidMount() {
        // Sets search bounds to worldwide
        this.state.bounds.extend(new window.google.maps.LatLng(-90, -180));
        this.state.bounds.extend(new window.google.maps.LatLng(90, 180));
    }

    handleChange = place => {
        this.setState({ place });
    };

    handleSelect = place => {
        // retrieves latitue and logitude from address selected
        geocodeByAddress(place)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.onLocationSelected({ address: place, coordinates: latLng }))
            .catch(error => console.error('Error', error));
        this.setState({ place: place });
    };

    renderSuggestions = ({ getInputProps, suggestions, getSuggestionItemProps, loading}) => {
        return (
            <div>
                <TextField
                    {...getInputProps({
                        className: 'location-search-input',
                    })}
                    error={this.props.error}
                    helperText={this.props.error ? "Cannot leave field blank." : ""}
                    fullWidth
                    label="Add Location"
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        // highlights suggestion if being hovered over
                        const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                    style,
                                })}
                            >
                                <Typography variant="body2" gutterBottom>{suggestion.description}</Typography>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.place}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={{
                    bounds: this.state.bounds,
                }}
            >
                {this.renderSuggestions}
            </PlacesAutocomplete>
        );
    }
}