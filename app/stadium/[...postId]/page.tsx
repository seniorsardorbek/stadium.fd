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
import { AddComment, CommentBank, CommentOutlined, CommentRounded, InsertComment, Person } from "@mui/icons-material";
import { SimpleMap } from "@/components/map";
import Comments from "@/components/comments";
function Detailed({ params: { postId } }: { params: { postId: string } }) {
  const [stadion, setStadions] = useState<StadionType>();
  const [loader, setLoader] = useState<boolean>(true);
  const [openComments, setOpenComments] = useState<boolean>(false);
const [count , setCount] = useState<boolean>(false) 
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
      className={`flex flex-wrap mt-16 items-center justify-between mx-auto `}
    >
      {loader ? (
        <Loader />
      ) : (
        <section className=" w-full relative ">
          <Carousel
            swipeable={true}
            centerMode={true} // Enable center mode
            autoPlay={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            stopOnHover={true}
            showThumbs={false}
            emulateTouch={true}
            centerSlidePercentage={90} // Adjust the percentage of the slide that is visible in the center
          >
            {stadion?.images.map((el, i) => (
              <div key={i} className="relative md:h-[650px] h-44 w-full">
                <CustomImage fill url={el} alt="zor" />
              </div>
            ))}
          </Carousel>
          <div className=" m-2 text-gray-700 dark:text-white flex flex-col gap-1 ">
            <div className="flex flex-col dark:bg-gray-700 bg-blue-50 p-2 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base">
              <p>
                <EditLocationOutlinedIcon sx={{width : '20px'}} /> {stadion?.destination}
              </p>
              <div className=" flex gap-3  ">
                <div className="w-1/2 flex flex-col gap-1">
                  <span>
                    <AttachMoneyOutlinedIcon sx={{width : '20px'}} />
                    {stadion?.cost}so&apos;m{" "}
                  </span>
                  <a
                    className="flex items-center "
                    href={`tel${stadion?.callnumber}`}
                  >
                    {" "}
                    <Call />
                    {stadion?.callnumber}
                  </a>
                  <span className="flex  items-center">
                    <Size/> <span> {stadion?.size?.w}m</span>
                    <span>{stadion?.size?.h}m</span>
                  </span>
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                  <ReactStars
                    edit={false}
                    half
                    count={3}
                    value={stadion?.rate}
                  />
                  <p className="">
                    <Person sx={{width : '20px'}} /> {stadion?.owner?.name}
                  </p>
                  <button
                    className="flex items-start gap-2"
                    onClick={(e) => toggleComments(e)}
                  >
                    <InsertComment sx={{width : '20px'}} />
                    Sharhlar
                  </button>
                </div>
              </div>
            </div>
            <div  className="flex justify-around flex-col md:flex-row  gap-1 md:gap-0  transition-all  duration-500 items-start">
              <div className="flex flex-col  gap-2 md:w-2/3 w-full " onClick={() => setCount(!count)}>
                <p className={ `text-sm p-3 m-2 dark:bg-gray-700 bg-blue-50 overflow-clip  transition-height ease-in-out duration-300 ${count ? "max-h-52  h-52 overflow-y-scroll-scroll" : " h-[60px]"}  rounded-xl  `}>
                  {stadion?.description.slice(0 , (count ? stadion.description.length : 100)) }{count? "":"..."} 
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
