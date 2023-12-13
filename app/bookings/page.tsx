"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
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
import Segments from "@/components/segments";
import NoToken from "@/components/noToken";

function Bookings() {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.data);
  const [bookings, setBookings] = useState<bookingFace[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!token) {
    return <NoToken />;
  }
  return (
    <main className="duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5  ">
      <div>
        <Segments />
      </div>
      {loading ? (
        <Loader />
      ) : (
        bookings?.map((el, i) => (
          <div
            key={i}
            className="md:w-[500px] w-[90%] border dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2 "
          >
            {/* ... rest of your component code ... */}
          </div>
        ))
      )}
    </main>
  );
}

export default Bookings;
