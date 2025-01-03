import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Example latitude (San Francisco)
  lng: -122.4194, // Example longitude
};

const GoogleMapComponent: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Additional Map Features */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
