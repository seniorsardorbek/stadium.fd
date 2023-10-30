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
import { Comment, CommentOutlined, Person } from "@mui/icons-material";
import { SimpleMap } from "@/components/map";
import Comments from "@/components/comments";

function Detailed({ params: { postId } }: { params: { postId: string } }) {
  const [stadion, setStadions] = useState<StadionType>();
  const [loader, setLoader] = useState<boolean>(true);
  const [openComments, setOpenComments] = useState<boolean>(false);

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
  function toggleComments(e: any) {
    if (openComments) {
      if (e.target.id === "commentsWrapper") {
        setOpenComments(false);
      }
    } else {
      setOpenComments(true);
    }
  }

  return (
    <main
      className={`flex flex-wrap mt-16 items-center justify-between mx-auto`}
    >
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
          <div className=" m-2 text-gray-700 dark:text-white flex flex-col gap-1 ">
            <div className="flex flex-col dark:bg-gray-700 bg-blue-50 p-4 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base">
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
                    className="flex items-center "
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
                <div className="w-1/2 flex flex-col gap-1" >
                  <ReactStars
                    edit={false}
                    half
                    count={3}
                    value={stadion?.rate}
                  />
                  <p className="" >
                    <Person /> {stadion?.owner?.name}
                  </p>
                  <button className="flex items-center" onClick={(e) => toggleComments(e)}><CommentOutlined/>Sharhlar</button>
                </div>
              </div>
            </div>
            <div className="flex justify-around flex-col md:flex-row  gap-1 md:gap-0  items-start">
              <div className="flex flex-col  gap-2 md:w-2/3 w-full">
                <p className="text-sm p-4 m-2 dark:bg-gray-700 bg-blue-50  h-auto  rounded-xl   ">
                  {stadion?.description}
                </p>
              </div>
              <Bookings stadionId={stadion?._id!} />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <SimpleMap lat={stadion?.lat!} lng={stadion?.lng!} />
          </div>
          <Comments
            openComments={openComments}
            toggleComments={toggleComments}
            stadiumId={stadion?._id!}
          />
        </section>
      )}
    </main>
  );
}

export default Detailed;
