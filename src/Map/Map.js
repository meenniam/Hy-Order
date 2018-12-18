import React from "react";
import DoctorsMap from "./DoctorsMap";

export default class DoctorsMapContainer extends React.Component {

	render() {
		return (
			<DoctorsMap
				doctors={this.props.marker}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA36JkgHbfhad4b2fH4tZtpqGZ8E_YDXRI&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: "100%" }} />}
				containerElement={<div style={{ height: `300px`, width: `100%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
