"use client"
import { StadionType } from "@/utils/types";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import CustomImage from "@/components/image";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { formatNumber } from "@/utils/utils";
import { Call, CommentTwoTone, Person, PhotoSizeSelectActual } from "@mui/icons-material";
import { Size } from "@/public/icons";
import { Bookings } from "@/components";
import { SimpleMap } from "@/components/map";
import Comments from "@/components/comments";
import ReactStars from "react-stars";

const Stadion = ({stadium } :{stadium: StadionType}) => {
    const [openComments, setOpenComments] = useState<boolean>(false)
    const [count, setCount] = useState<boolean>(false)
    function toggleComments (e: any) {
        if (openComments) {
          if (e.target.id === 'commentsWrapper') {
            setOpenComments(false)
          }
        } else {
          setOpenComments(true)
        }
      }
    return  <section className=' w-full '>
        <Swiper
          effect='fade'
          loop
          centeredSlides
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          autoplay={true}
          className='w-full  md:h-[500px] h-[30vh]'
        >
          {stadium.images.map((image , i) => (
            <SwiperSlide key={i} className=''>
              <CustomImage url={image} alt='jdjjd' fill />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=' duration-100 max-w-screen-xl ] w-full   mx-auto p-2  transition-all md:p-2 '>
          <div className='flex flex-col dark:bg-gray-700 bg-blue-50 p-2 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base'>
            <p>
              <EditLocationOutlinedIcon sx={{ width: '20px' }} />{' '}
              {stadium?.destination}
            </p>
            <div className=' flex gap-3  '>
              <div className='w-1/2 flex flex-col gap-1'>
                <span>
                  <AttachMoneyOutlinedIcon sx={{ width: '20px' }} />
                  {formatNumber(stadium?.cost || 0)}
                </span>
                <a
                  className='flex items-center '
                  href={`tel:${stadium?.callnumber}`}
                >
                 
                  <Call />
                  {stadium?.callnumber}
                </a>
                <span className='flex  items-center'>
                  <Size /> <span> {stadium?.size?.w}m</span>
                  <span>{stadium?.size?.h}m</span>
                </span>
              </div>
              <div className='w-1/2 flex flex-col gap-1'>
                <ReactStars
                  edit={false}
                  half
                  count={3}
                  value={stadium?.rate}
                />
                <p className=''>
                  <Person sx={{ width: '20px' }} /> {stadium?.owner?.name}
                </p>
                <button
                  className='flex items-start gap-2'
                  onClick={e => toggleComments(e)}
                >
                  <CommentTwoTone sx={{ width: '20px' }} />
                  Fikrlar
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-around flex-col md:flex-row  gap-1 md:gap-0   items-start'>
            <div
              className='flex flex-col  gap-2 w-full '
              onClick={() => setCount(!count)}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    stadium?.description.slice(
                      0,
                      count ? stadium.description.length : 100
                    ) || ' '
                }}
                className={`text-sm p-3 m-2 dark:bg-gray-700 bg-blue-50  text-gray-950 dark:text-white   transition-height ease-in-out  duration-100  rounded-xl  `}
              ></p>
            </div>
            <Bookings stadionId={stadium?._id!} />
          </div>
        </div>
        <div className='flex justify-center w-full'>
          <SimpleMap lat={stadium?.lat!} lng={stadium?.lng!} />
        </div>
        <Comments
          openComments={openComments}
          toggleComments={toggleComments}
          stadiumId={stadium?._id!}
        />
      </section>

};

export default Stadion;
