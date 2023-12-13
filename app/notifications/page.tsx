"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/utils/api";
import { useRouter } from "next/router"; // Correct the import for useRouter
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "@/components";
import Segments from "@/components/segments";
import { eventsFace } from "@/utils/types";
import { prettyDateFormat } from "@/utils/utils";
import {
  Done,
  DoneAll,
  NotificationsActive,
  Person,
} from "@mui/icons-material";
import NoToken from "@/components/noToken";

function Notifications() {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.data);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<eventsFace[]>([]);

  useEffect(() => {
    if (token && loading) {
      getEvents();
    }
  }, [loading, token]);

  const getEvents = () => {
    setLoading(true);
    getData(`eventss`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.warning(err.response.data.message);
        if (err.response.status === 401) {
          router.push("login");
        }
      });
  };

  const markAsRead = (id: string) => {
    getData
      .put(
        `eventss/${id}`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(() => {
        getEvents();
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };

  function Notif({ el }: { el: eventsFace }) {
    console.log(el.created_at);
    return (
      <button
        disabled={el.viewed}
        onDoubleClick={() => !el?.viewed && markAsRead(el?._id)}
        className={`w-[90%] cursor-pointer md:max-w-lg relative flex flex-col justify-between mx-auto my-2 dark:bg-gray-700 bg-blue-100 dark:text-white rounded-xl h-24 p-3 ${
          el.viewed ? "opacity-70" : ""
        }`}
      >
        {/* ... your component code */}
      </button>
    );
  }

  if (!token) {
    return <NoToken />;
  }

  return (
    <main className="duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5 ">
      <div>
        <Segments />
      </div>
      {loading ? <Loader /> : events?.map((el, i) => <Notif key={i} el={el} />)}
    </main>
  );
}

export default Notifications;
