import config from "@/utils/config";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export const SimpleMap = ({ lat, lng }: { lat: number; lng: number }) => (
  <YMaps
    query={{
      suggest_apikey: config.mapKey,
      apikey: config.mapKey,
    }}
  >
    <div className="w-full h-full">
      <Map
        style={{
          width: "100%",
          minWidth: "220px",
          height: "45vh",
          minHeight: "440px",
        }}
        defaultState={{ center: [lat, lng], zoom: 14 }}
      >
        <Placemark geometry={[lat, lng]} />
      </Map>
    </div>
  </YMaps>
);
