"use client";
import { Bookings, Loader } from "@/components";
import Comments from "@/components/comments";
import { SimpleMap } from "@/components/map";
import { getData } from "@/utils/api";
import { StadionType } from "@/utils/types";
import {
  InsertComment,
  Person
} from "@mui/icons-material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ReactStars from "react-stars";
import { Call, Size } from "../../../public/icons";
function Detailed({ params: { postId } }: { params: { postId: string } }) {
  const [stadion, setStadions] = useState<StadionType>();
  const [loader, setLoader] = useState<boolean>(true);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [count, setCount] = useState<boolean>(false);
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
  function Cars() {
    return (
      <div className="relative w-full  " >

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={3000}
        transitionTime={500}
        centerMode={true}
        centerSlidePercentage={90}
        swipeScrollTolerance={5}
        >
        {stadion!.images.map((el, i) => (
          <div key={i} className="  relative  md:h-[650px] h-44 overflow-hidden w-full">
            <Image src={'http://192.168.100.22:4000/' + el}  width={0} height={0} style={{width :'100%' , height:'100%'}}  alt="s" />
          </div>
        ))}
      </Carousel>
        </div>
    );
  }
  return (
    <main
      className={`flex flex-wrap mt-16  mx-auto `}
    >
      {loader ? (
        <Loader />
      ) : (
        <section className=" w-full relative ">
          {
            <Cars/>
          }
          <div className=" m-2 text-gray-700 dark:text-white flex flex-col gap-1 ">
            <div className="flex flex-col dark:bg-gray-700 bg-blue-50 p-2 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base">
              <p>
                <EditLocationOutlinedIcon sx={{ width: "20px" }} />{" "}
                {stadion?.destination}
              </p>
              <div className=" flex gap-3  ">
                <div className="w-1/2 flex flex-col gap-1">
                  <span>
                    <AttachMoneyOutlinedIcon sx={{ width: "20px" }} />
                    {stadion?.cost}so&apos;m{" "}
                  </span>
                  <a
                    className="flex items-center "
                    href={`tel:${stadion?.callnumber}`}
                  >
                    {" "}
                    <Call />
                    {stadion?.callnumber}
                  </a>
                  <span className="flex  items-center">
                    <Size /> <span> {stadion?.size?.w}m</span>
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
                    <Person sx={{ width: "20px" }} /> {stadion?.owner?.name}
                  </p>
                  <button
                    className="flex items-start gap-2"
                    onClick={(e) => toggleComments(e)}
                  >
                    <InsertComment sx={{ width: "20px" }} />
                    Sharhlar
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-around flex-col md:flex-row  gap-1 md:gap-0  transition-all  duration-500 items-start">
              <div
                className="flex flex-col  gap-2 md:w-2/3 w-full "
                onClick={() => setCount(!count)}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      stadion?.description.slice(
                        0,
                        count ? stadion.description.length : 70
                      ) || " ",
                  }}
                  className={`text-sm p-3 m-2 dark:bg-gray-700 bg-blue-50   transition-height ease-in-out duration-300 ${
                    count
                      ? "max-h-52  h-52 overflow-y-scroll-scroll"
                      : " h-[60px]"
                  }  rounded-xl  `}
                ></p>
              </div>
              {/* <Bookings stadionId={stadion?._id!} /> */}
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
