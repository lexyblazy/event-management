import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
const style = {
  width: "100%",
  height: "100% "
};

class MapContainer extends Component {
  render() {
    const { lat, lon } = this.props;
    return (
      <Map
        style={style}
        google={this.props.google}
        initialCenter={{
          lat: lat,
          lng: lon
        }}
        zoom={14}
      >
        <Marker onClick={() => {}} name={"Current location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
