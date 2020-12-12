import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useScrollTrigger } from "@material-ui/core";

import Box from "@material-ui/core/Box";

const MapContainer = (props) => {
  const mapStyles = {
    width: "59%",
    height: "32%",
  };
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      center={{
        lat: props.signallat,
        lng: props.signallong,
      }}
    >
      <Marker
        position={{
          lat: props.publiclat,
          lng: props.publiclong,
        }}
        label="Public CAM"
      />
      <Marker
        position={{
          lat: props.privatelat,
          lng: props.privatelong,
        }}
        label="Private CAM"
      />
      <Marker
        position={{
          lat: props.policelat,
          lng: props.policelong,
        }}
        label="Police Station"
      />
      <Marker
        position={{
          lat: props.signallat,
          lng: props.signallong,
        }}
        label="Signal Loc"
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
