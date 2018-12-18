import React from "react";
import { Marker } from "react-google-maps";
import StethoscopeIcon from "./assets/iconMarker.svg";

export default class DoctorMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
        >
        </Marker>
    );
  }
}
