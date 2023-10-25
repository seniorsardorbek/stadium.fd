"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StadionType } from "@/utils/types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "@/components/card";
import Loader from '../../components/loader/loader';
import { useSelector } from "react-redux";
import { getData } from "@/utils/api";

const Stadions = () => {
    const [stadions, setStadions] = useState<StadionType[]>([]);
    const [loader, setLoader] = useState<Boolean>(true)
    const { UserLoc } = useSelector((state :any ) => state.data);
    console.log(UserLoc);

      
    useEffect(() => {
        
       getData(`stadions${UserLoc?`?nearby[lat]=${UserLoc?.lat}&nearby[lng]=${UserLoc?.lng}&nearby[maxDistance]=1000`:""}`, {
            params: {
                "sort[by]": "rate",
                "sort[order]": "desc",
            },
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
            <h1 className="mx-auto text-center my-3 text-gray-900 dark:text-white text-4xl   " >Hamma stadionlar</h1>
            <ul className="flex flex-wrap  justify-center items-center " >
                 { loader? <Loader/> :  stadions.map((stadion: StadionType, index) => (
                    <Card stadion={stadion} key={stadion._id} />
                ))}
            </ul>
        </main>
    );
};

export default Stadions;
