"use client";
import { Bookings, Loader } from "@/components";
import CustomImage from "@/components/image";
import { StadionType } from "@/utils/types";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Call, Size } from "../../../public/icons";
import ReactStars from "react-stars";
import { getData } from "@/utils/api";
import { Person } from "@mui/icons-material";
import { SimpleMap } from "@/components/map";

function Detailed({ params: { postId } }: { params: { postId: string } }) {
  const [stadion, setStadions] = useState<StadionType>();
  const [loader, setLoader] = useState<Boolean>(true);

  useEffect(() => {
    setLoader(true);
    getData(`stadions/${postId}`)
      .then((response) => {
        const responseData = response.data;
        setStadions(responseData);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error fetching data:", error);
      });
  }, [postId]);

  return (
    <main className="flex flex-wrap mt-16 items-center justify-between mx-auto  ">
      {loader ? (
        <Loader />
      ) : (
        <section className="w-full">
          <Carousel
            autoPlay
            swipeable={true}
            emulateTouch
            showThumbs={false}
            showArrows={false}
            width={"100%"}
          >
            {stadion?.images.map((el, i) => (
              <div
                key={i}
                className=" relative md:h-[650px]   h-56  w-full flex  "
              >
                <CustomImage fill url={el} alt="zor" />
              </div>
            ))}
          </Carousel>
          <div className="p-2 m-2 text-gray-900 dark:text-white flex flex-col gap-2">
            <p>
              <EditLocationOutlinedIcon /> {stadion?.destination}
            </p>
            <div className=" flex gap-3  ">
              <div className="w-1/2 flex flex-col gap-1">
                <span>
                  <AttachMoneyOutlinedIcon />
                  {stadion?.cost}so&apos;m{" "}
                </span>
                <a
                  className="flex items-center"
                  href={`tel:+998${stadion?.callnumber}`}
                >
                  {" "}
                  <Call /> +998 {stadion?.callnumber}
                </a>
                <span className="flex  items-center">
                  <Size /> <span> {stadion?.size?.w}m</span>
                  <span>{stadion?.size?.h}m</span>
                </span>
              </div>
              <div>
                <ReactStars edit={false} half count={3} value={stadion?.rate} />
                <p>
                  <Person /> {stadion?.owner?.name}
                </p>
              </div>
            </div>
            <div></div>
            <div className="flex justify-around flex-col md:flex-row  gap-3 md:gap-0  items-start">
              <p className="text-sm p-2  h-auto border border-gray-500 dark:border-gray-100 rounded-md md:w-2/3 w-full  ">
                {stadion?.description}
              </p>
              <Bookings stadionId={stadion?._id} />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <SimpleMap lat={stadion?.lat ?? 0} lng={stadion?.lng ?? 0} />
          </div>
        </section>
      )}
    </main>
  );
}

export default Detailed;
