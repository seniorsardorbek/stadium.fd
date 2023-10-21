"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StadionType } from "@/utils/types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "@/components/card";
import Loader from '../../components/loader/loader';
import { useSelector } from "react-redux";

const Stadions = () => {
    const [stadions, setStadions] = useState<StadionType[]>([]);
    const [loader, setLoader] = useState<Boolean>(true)
    const {   token} = useSelector((state :any ) => state.data);

    useEffect(() => {
        setLoader(true)
        axios
            .get("http://localhost:4000/api/stadions", {
                params: {
                    "sort[by]": "rate",
                    "sort[order]": "desc",
                },
                // headers :{ authorization: `Bearer ${token}`}
            })
            .then((response) => {
                const responseData = response.data.data;
                setStadions(responseData);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <main className="duration-100 max-w-screen-xl min-h-[65vh]   mx-auto p-2  transition-all mt-12 md:p-5 ">

            <h1 className="mx-auto text-center my-3  " >Hamma stadionlar</h1>
           
            
            <ul className="flex flex-wrap  justify-center items-center " >
                 { loader? <Loader/> :  stadions.reverse().map((stadion: StadionType, index) => (
                    <Card stadion={stadion} key={stadion._id} />
                ))}
            </ul>
        </main>
    );
};

export default Stadions;
