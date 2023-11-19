import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
export const SimpleMap = ({ lat, lng }: { lat: number; lng: number })  => {
 return <YMaps 
 
    query={{
      suggest_apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
      apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
      
    }}

  >
    <main className="w-full h-full">
      <Map
        style={{
          width: "100%",
          minWidth: "220px",
          height: "27vh",
          minHeight: "40px",
        }}
        defaultState={{ center: [lat, lng], zoom: 14   }}
      >
        <Placemark  geometry={[lat, lng]} />
      </Map>
    </main>
  </YMaps>;}
