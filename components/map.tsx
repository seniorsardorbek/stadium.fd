import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";



export default function SimpleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxwHSME0662shRNoOUMfK_AkaBVFfTc-Y" as string,
  });
  

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 41.311081, lng: 69.240562 }), []);

  return (
    <GoogleMap 
      zoom={12}
      center={center}
      mapContainerClassName="relative w-[95%] h-[80vh]"
    >
      <Marker   position={center} />
    </GoogleMap>
  );
}
