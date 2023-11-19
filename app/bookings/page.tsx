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

function Bookings() {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.data);
  if (!token) {
   return NoToken()
  }
  const [bookings, setBookings] = useState<bookingFace[]>([]);
  const [loader, setLoader] = useState(true);
  console.log(token);
  const getBookings = () => {
    setLoader(true);
    getData(`bookings`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setBookings(res.data);
        setLoader(false);
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
        if (err.response.status === 401) {
          router.push("login");
        }
      });
  };
  useEffect(() => {
    getBookings();
  }, [token]);
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
    <main className="mt-16">
      <div>
        <h3 className="text-2xl text-gray-900 dark:text-white font-semibold text-center p-3">
          Your bookings!
        </h3>
      </div>
      {loader ? (
        <Loader />
      ) : (
        bookings.map((el, i) => (
          <div
            key={i}
            className="md:w-[500px] w-[90%] border dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2"
          >
            <div className="flex justify-between text-gray-600 dark:text-gray-300 tex-sm ">
              <div title="O'yin vaqti va manzili" className="text-sm w-[70%]">
                <Games sx={{ width: "18px" }} />{" "}
                {formatDateWithMonthNames(el.from)}
                <Link href={`stadium/${el.stadion._id}`}>
                  <LocationOn sx={{ width: "18px" }} /> {el.stadion.destination}
                </Link>
              </div>
              <div className="flex text-xs"></div>
              <button onClick={() => deleteGame(el._id)}>
                <CancelRounded />
              </button>
            </div>
            <div className="text-gray-700 dark:text-gray-300 flex justify-between">
              <span>
                {" "}
                <Person /> {el.stadion?.owner?.name}
              </span>{" "}
              <a
                className="ml-5 underline text-sm"
                href={`tel:+998${el.stadion?.callnumber}`}
              >
                {" "}
                <Call sx={{ width: "20px" }} />
                +998{el.stadion?.callnumber}
              </a>
            </div>
            <div className="flex gap-10 justify-between">
              <div className="text-sm  flex items-center text-gray-500  gap-2">
                <AccessTime sx={{ color: "gray", width: "15px" }} />{" "}
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
