"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  AccessTime,
  Call,
  CancelRounded,
  Games,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { getData } from "@/utils/api";
import { bookingFace } from "@/utils/types";
import { prettyDateFormat, formatDateWithMonthNames } from "@/utils/utils";
import { Loader } from "@/components";
import Link from "next/link";
import NoToken from "@/components/noToken";
import Segments from "@/components/segments";

function Bookings() {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.data);
  const [bookings, setBookings] = useState<bookingFace[]>([]);
  const [loading, setLoading] = useState(true);
  if(!token){
    return <NoToken/>
}
  useEffect(() => {
    if (token && loading) {
      getBookings();
    }
  }, [token, loading]);

  const getBookings = () => {
    setLoading(true);
    getData(`bookings`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
        console.log("hey");
        setLoading(false);
        if (err.response.status === 401) {
          router.push("login");
        }
      });
  };

  const deleteGame = (id: string) => {
    getData
      .delete(`bookings/one/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.msg);
        getBookings();
      });
  };

  return (
    <main className="duration-100 max-w-screen-xl min-h-[65vh]   mx-auto p-2  transition-all mt-12 md:p-5 ">

      <div>
        <Segments />
      </div>
      {loading ? (
        <Loader />
      ) : (
        bookings?.map((el, i) => (
          <div
            key={i}
            className="md:w-[500px] w-[90%] border dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2"
          >
            <div className="flex justify-between text-gray-600 dark:text-gray-300 tex-sm ">
              <div title="O'yin vaqti va manzili" className="text-xs w-[90%]">
                <Games sx={{ width: "14px" }} />{" "}
                {formatDateWithMonthNames(el.from)}
                <Link href={`stadium/${el.stadion._id}`}>
                  <LocationOn sx={{ width: "14px" }} /> {el.stadion.destination}
                </Link>
              </div>
              <div className="flex text-xs"></div>
              <button disabled={el?.confirmed} onClick={() => deleteGame(el._id)}>
                <CancelRounded />
              </button>
            </div>
            <div className="text-gray-700 text-xs dark:text-gray-300 flex justify-between items-center">
              <span className="flex items-center">
                {" "}
                <Person sx={{ width: "14px" }} /> {el.stadion?.owner?.name}
              </span>{" "}
              <a
                className="ml-5 underline text-sm"
                href={`tel:+998${el.stadion?.callnumber}`}
              >
                {" "}
                <Call sx={{ width: "14px" }}  />
                {el.stadion?.callnumber}
              </a>
            </div>
            <div className="flex gap-1 items-center justify-between">
              <div className="text-xs  flex items-center text-gray-500  gap-2">
                <AccessTime sx={{ color: "gray", width: "14px" }} />{" "}
                {prettyDateFormat(`${el.created_at}`)}
              </div>
              <div>
                {" "}
                {el.confirmed ? (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Confirmed
                  </span>
                ) : (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Bookings;
