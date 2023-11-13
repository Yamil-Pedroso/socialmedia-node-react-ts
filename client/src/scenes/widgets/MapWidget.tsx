import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const containerStyle = {
  width: "36.5rem",
  height: "29rem",
  borderRadius: ".7rem",
};

const Map = () => {
  const center = useMemo(
    () => ({
      lat: 47.04916,
      lng: 8.30964,
    }),
    [],
  );

  return (
    <WidgetWrapper style={{ marginTop:"2rem", zIndex: -2 }}>
      <FlexBetween>
        {/*<GoogleMap zoom={15} center={center} mapContainerStyle={containerStyle} mapContainerClassName="squib-map-container">
          <MarkerF position={center} />
        </GoogleMap> */}
      </FlexBetween>
    </WidgetWrapper>
  );
};

const MapWidget = () => {
  //const coor = process.env.SQUIB_GOOGLE_MAPS_APIKEY as string;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

export default MapWidget;
