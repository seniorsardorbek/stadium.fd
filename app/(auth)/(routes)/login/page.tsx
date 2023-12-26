"use client";
import MiniLoader from "@/components/miniloader";
import { getData } from "@/utils/api";
import { setToken, setUserData } from "@/utils/redux/store/dataSlice";
import { Email, Key } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import VerificationInput from "react-verification-code-input";
const Login = () => {
  const [data, setadata] = useState<{ code: number }>({
    code: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    getData
      .post("/auth/login", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setToken({ token: res.data.token }));
          dispatch(setUserData({ data: res.data.data }));
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.msg)
      });
  };
  const handlechange = (e: string) => {
    setadata({
      code: parseInt(e),
    });
  };
  return (
    <section className=" w-full h-[100vh]  flex bg-white dark:bg-gray-700 items-center justify-center flex-col">
      <div className="flex flex-col  w-full justify-center">
        <span className="text-center" > <a href="https://t.me/minimatchbot" target="_blank" rel="noopener noreferrer"> @minimatch</a> telegram botiga kiring va 1 daqiqalik kodingizni oling.</span>
        <form
          onSubmit={(e) => handeSubmit(e)}
          className="md:w-[30%] w-[70%] flex gap-5 flex-col items-center justify-between  mx-auto mt-12 "
        >
          <VerificationInput required 
          fieldHeight={30}
            type="number"
            loading={loading}
            fields={4}
            className="mx-auto"
            onChange={(e) => handlechange(e)}
            autoFocus
          />

          <button
            type="submit"
            className="text-white mx-auto bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 md:py-2.5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {loading ? <MiniLoader /> : "Yuborish!"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
