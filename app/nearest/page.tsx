"use client";
import { getData } from "@/utils/api";
import { StadionType } from "@/utils/types";
import {
  Map,
  ObjectManager,
  Placemark,
  YMaps,
  Clusterer,
} from "@pbe/react-yandex-maps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page() {
  const [stadions, setStadions] = useState<StadionType[]>([]);
  const [loader, setLoader] = useState<Boolean>(true);
  const { UserLoc } = useSelector((state: any) => state.data);

  useEffect(() => {
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
  }, []);
  const history = useRouter();
  const handlePlacemarkClick = (_id: string) => {
    history.push(`stadium/${_id}`);
  };
  return (
    <main className="mt-16">
      <YMaps
        query={{
          suggest_apikey :'d6731aa6-00f1-4319-9583-87938fbc50f9',
          apikey: "d6731aa6-00f1-4319-9583-87938fbc50f9",
        }}
      >
        <Map
          style={{ width: "100%", minWidth: "220px", height: "70vh" }}
          defaultState={{
            center: [41.311081, 69.240562],
            zoom: 12,
          }}
        >
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
    </main>
  );
}

export default Page;
