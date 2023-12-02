"use client";
import { getData } from "@/utils/api";
import React, { FC, useEffect, useState } from "react";
import {
    getCurrentFormattedDate,
    getMillisecondsForAllHours,
} from "@/utils/utils";
import { bookingFace } from "@/utils/types";
import { Call, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import MiniLoader from "./miniloader";
import { toast } from "react-toastify";
import NoToken from "./noToken";

interface Props {
    stadionId?: string;
}
const Bookings: FC<Props> = ({ stadionId }) => {
    const [bookings, setbookings] = useState<bookingFace[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [data, setData] = useState({});
    const [loader, setLoader] = useState<boolean>(false);
    const [visible, setvisibe] = useState<boolean>(false);
    const { token } = useSelector((state: any) => state.data);

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((pre) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };
    const currentFormattedDate = getCurrentFormattedDate(currentDate);
    
    const handleNextDayClick = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(nextDate);
    };
    const handlePreDayClick = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(nextDate);
    };
    var date = new Date(currentFormattedDate);
    var hoursInMilliseconds = getMillisecondsForAllHours(date);

    useEffect(() => {
        getData(`bookings/${stadionId}`).then((data) => {
            setbookings(data.data);
        });
    }, [stadionId]);

    function bookingfunction(time: number) {
        setData({ from: time, stadion: stadionId });
        setvisibe(true);
    }
    function Bookingsubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoader(true);
        getData
            .post("bookings", data, { headers: { authorization: `Bearer ${token}` } })
            .then((res) => {
                toast.success(res.data?.msg )
            })
            .catch((err) => {
                toast.error("Malumot togriligiga ishonch hosil qiling")
            })
            .finally(() => {
                setLoader(false);
                setvisibe(false)
            });
    }
    function Hours({ i, value }: hoursProps) {
        const booked: boolean  = bookings.some(
            (bookingDetail) => bookingDetail.from === value
        );
        return (
            <button
                onClick={() => bookingfunction(value)}
                disabled={booked}
                className={` cursor-pointer border text-gray-900 hover:bg-opacity-25  dark:text-white border-gray-900 w-20 h-10 ${booked && "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                data-value={value}
            >
                {i}:00
            </button>
        );
    }
    return (
        <div className="flex gap-3 dark:bg-gray-700 bg-blue-50 m-2 p-2  rounded-xl flex-col text-gray-700">
            <div className="flex items-center justify-center gap-4">
                <button className="border-2  dark:text-white rounded-lg active:scale-95 " onClick={handlePreDayClick}>
                    <KeyboardArrowLeft sx={{ rotate: "180" }} />
                </button>
                <h1 className=" text-gray-900 dark:text-white">{currentFormattedDate}</h1>
                <button className="border-2  dark:text-white rounded-lg active:scale-95" onClick={handleNextDayClick}>
                    <KeyboardArrowRight />
                </button>
            </div>
            <div className="flex  flex-wrap  justify-center ">
                {hoursInMilliseconds?.map((el, i) => {
                    return <Hours key={i} i={i} value={el} />;
                })}
            </div>
            <div>
                <div
                    className={` bg-black  z-10 bg-opacity-60 ${visible ? "fixed" : "hidden"
                        } top-0 left-0 w-full h-[100vh] flex items-center  justify-center`}
                >
                    <div className="relative w-[80%] max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => setvisibe(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8 ">
                                <h3 className="mb-4 md:text-xl text-lg text-center  font-medium text-gray-700 dark:text-white">
                                   So&apos;rov yuborish uchun formani to&apos;ldiring
                                </h3>
                                <form
                                    onSubmit={(e) => Bookingsubmit(e)}
                                    className="space-y-6"
                                    action="#"
                                >
                                    <div>
                                        <label
                                            htmlFor="n"
                                            className="block text-center mb-2 text-xs font-medium text-gray-700 dark:text-white"
                                        >
                                           <Call sx={{width:"14px"}} /> Bog&apos;lanish uchun mobil raqam qoldiring (majburiy)
                                        </label>
                                        <input
                                            onChange={handlechange}
                                            type="number"
                                            name="callNumber"
                                            id="n"
                                            placeholder="+998913332003"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {loader ? <MiniLoader /> : "Tasdiqlash"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
interface hoursProps {
    i: number;
    value: number;
}

export default Bookings;
