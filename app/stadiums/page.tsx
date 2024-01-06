"use client";
import { useEffect, useState } from "react";

import Card from "@/components/card";
import Segments from "@/components/segments";
import { getData } from "@/utils/api";
import { StadionType } from "@/utils/types";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../../components/loader";

const Stadions = () => {
  const [stadions, setStadions] = useState<StadionType[]>([]);
  const [loader, setLoader] = useState<Boolean>(true);
  const { UserLoc } = useSelector((state: any) => state.data);

  useEffect(() => {
    getData(
      `stadions${
        UserLoc
          ? `?nearby[lat]=${41.277052}&nearby[lng]=${69.233813}&nearby[maxDistance]=1000`
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
      });
  }, [UserLoc]);


  return (
    <main className="duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5 ">
      <div>
        <Segments currentPage="Stadionlar" />
      </div>
      <ul className="flex flex-wrap justify-center md:justify-start    ">
        {loader ? (
          <Loader />
        ) : (
          stadions.map((stadion: StadionType, index) => (
            <Card stadion={stadion} key={stadion._id} />
          ))
        )}
      </ul>
    </main>
  );
};

export default Stadions;
