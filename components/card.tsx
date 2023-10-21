import React, { FC } from 'react'
import { Carousel } from 'react-responsive-carousel';
import CustomImage from './image';
import Link from 'next/link';
import ReactStars from 'react-stars';
import { StadionType } from '../utils/types';

const Card: FC<{ stadion: StadionType }> = ({ stadion }) => {
    return (
        <li  className="bg-white    boxShadow cursor-pointer  h-48  relative rounded-lg  w-72  m-2  " >
            <Carousel
                autoPlay
                swipeable={false}
                showThumbs={false}
                showIndicators={false}
                showArrows={true} width={"100%"}  >
                {
                    stadion.images.map((el , i) => (
                        <div key={el} className=" relative h-48 w-full "  >
                            <CustomImage fill url={el} alt="zor" extraClass="rounded-lg" />
                        </div>
                    ))
                }
            </Carousel>
            <Link href={`stadium/${stadion._id}`} className="flex items-center absolute  bottom-0 bg-gradient-to-t from-gray-950 to-transparent text-white rounded-b-lg   justify-between p-3 text-xs -">
                <p className="w-[70%]" >
                    {
                        stadion.destination.substring(0, 130)
                    }...
                </p>
                <div className="flex  flex-col justify-end">
                    <span className="  bg-gray-700 text-white text-[10px] font-medium  px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-white" >{stadion.cost}sum</span>
                    <ReactStars
                        count={3}
                        className="text-gray flex  justify-end"
                        value={Number(stadion.rate)}
                        half
                        edit={false}
                    />
                </div>
            </Link>
        </li>
    )
}

export default Card