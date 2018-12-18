import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap , Marker } from "react-google-maps";
//import DoctorMarker from "./DoctorMarker";



const DoctorsMap = withScriptjs(withGoogleMap((props) =>{

  /*const markers = props.doctors.map( doctor => <DoctorMarker
                    key={doctor.uid}
                    doctor={doctor}
                    location={{lat: doctor.closestPractice.lat, lng: doctor.closestPractice.lon}}
                  />);*/

  return (
      <GoogleMap
        defaultZoom={17}
        center={ props.doctors }
        >
        <Marker position={props.doctors}/>
      </GoogleMap>
    );
  }
))

export default DoctorsMap;
