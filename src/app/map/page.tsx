"use client";
import { useEffect, useState } from "react";
import Header from "../components/header";

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSearchParams } from "next/navigation";
import { IDelivery } from "../models/delivery";
import BackButton from "../components/backButton";

interface IDirectionsServiceParams {
  lat: number;
  lng: number;
}

export default function Map() {
  const [origin, setOrigin] = useState<IDirectionsServiceParams>(
    {} as IDirectionsServiceParams
  );
  const [destination, setDestination] = useState<IDirectionsServiceParams>(
    {} as IDirectionsServiceParams
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const center = {
    lat: -20.5698661,
    lng: -47.3804479,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY ?? "",
  });

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();

  const loadDirection = async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  };

  useEffect(() => {
    const id = searchParams.get("id");

    fetch(`${process.env.BASE_URL}/delivery/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (response: IDelivery) => {
        console.log("response ", response);
        setOrigin({
          lat: response.initialLatitude,
          lng: response.initialLongitude,
        });
        setDestination({
          lat: response.finalLatitude,
          lng: response.finalLongitude,
        });
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <Header>
        <BackButton />
      </Header>
      {isLoaded && !loading && (
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
