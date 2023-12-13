"use client";
import { Loader } from "@/components";
import NotUserLoc from "@/components/notUserLoc";
import { getData } from "@/utils/api";
import { StadionType } from "@/utils/types";
import {
  Map,

  Placemark,
  YMaps,
  Clusterer,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// ... (imports remain the same)

function Page() {
  const { UserLoc } = useSelector((state: any) => state.data);
  const [stadions, setStadions] = useState<StadionType[]>([]);
  const [loader, setLoader] = useState<Boolean>(true);
  const history = useRouter();

  useEffect(() => {
    if (UserLoc && loader) {
      getData(
        `stadions${
          UserLoc
            ? `?nearby[lat]=${UserLoc?.lat}&nearby[lng]=${UserLoc?.lng}&nearby[maxDistance]=1000`
            : ""
        }`,
        {
          params: {
            "sort[by]": "rate",
            "sort[order]": "desc",
          },
        }
      )
        .then((response) => {
          const responseData = response.data.data;
          setStadions(responseData);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    }
  }, [UserLoc, loader]);

  const handlePlacemarkClick = (_id: string) => {
    history.push(`stadiums/${_id}`);
  };

  return (
    <main className="mt-16 relative w-full">
      {UserLoc ? (
        loader ? (
          <Loader />
        ) : (
          <YMaps
            query={{
              suggest_apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
              apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
            }}
          >
            <Map
              className="w-full h-[77vh] absolute"
              defaultState={{
                center: [UserLoc.lat || 41.311668, UserLoc.lng || 69.246089],
                zoom: 14,
              }}
            >
              <ZoomControl options={{ zoomDuration: 400 }} />
              <GeolocationControl  />
              <Clusterer
                options={{
                  preset: "islands#invertedVioletClusterIcons",
                  groupByCoordinates: false,
                }}
              >
                {stadions.map((coordinates, index) => (
                  <Placemark
                    onClick={() => handlePlacemarkClick(coordinates._id)}
                    key={index}
                    geometry={[coordinates.lat, coordinates.lng]}
                  />
                ))}
              </Clusterer>
            </Map>
          </YMaps>
        )
      ) : (
        <NotUserLoc />
      )}
    </main>
  );
}

export default Page;
  