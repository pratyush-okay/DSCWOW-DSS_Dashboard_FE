import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useScrollTrigger } from "@material-ui/core";

const mapStyles = {
  width: "61%",
  height: "30%",
};

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      center={{
        lat: props.policelat,
        lng: props.policelong,
      }}
    >
      <Marker
        position={{
          lat: props.publiclat,
          lng: props.publiclong,
        }}
      />
      <Marker
        position={{
          lat: props.privatelat,
          lng: props.privatelong,
        }}
      />
      <Marker
        position={{
          lat: props.policelat,
          lng: props.policelong,
        }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
