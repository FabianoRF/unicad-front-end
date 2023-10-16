"use client";
import { useState } from "react";
import Header from "../components/header";

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

export default function Route() {
  const center = {
    lat: -20.5698661,
    lng: -47.3804479,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY ?? '',
  });

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();

  const [origin, setOrigin] = useState({ lat: 40.756795, lng: -73.954298 });
  const [destination, setDestination] = useState({
    lat: 41.756795,
    lng: -78.954298,
  });

  const loadDirection = async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  };
  // useEffect(() => {
  //   loadDirection();
  // }, [destination, origin]);

  return (
    <>
      <Header></Header>
      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={5}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={loadDirection}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      )}
    </>
  );
}
