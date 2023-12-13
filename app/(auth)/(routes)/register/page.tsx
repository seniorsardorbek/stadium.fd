"use client";
import MiniLoader from "@/components/miniloader";
import { getData } from "@/utils/api";
import { setToken, setUserData } from "@/utils/redux/store/dataSlice";
import { ArrowBack, ArrowCircleLeft, Code, Email, Key, Person, RotateLeft, Verified, VerifiedUser } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import icon from "../../../../statics/add-image.png";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { hide, show } from "@/utils/utils";

const Register = () => {
  const [data, setadata] = useState<{
    name?: string;
    email?: string;
    password?: string;
    code?: number;
  }>({});
  const [image, setImage] = useState<File>();
  const [view, setView] = useState<FileReader>();
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);
  const [event, setEvent] = useState<"event1" | "event2">("event1");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleImageChange = (event: any) => {
    const files = event?.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setView(reader);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(event === "event1" ? { ...data, avatarka: image } : data);
  const handeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    getData
      .post(
        `/auth/${event === "event1" ? "register" : "verify-email"}`,
        event === "event1" ? { ...data, avatarka: image } : data,
        {
          headers: {
            "Content-Type": `${
              event === "event1" ? "multipart/form-data" : "application/json"
            }`,
          },
        }
      )
      .then((res) => {
        if (event === "event1" && res?.data?.success) {
          setLoading(false);
          setEvent("event2");
          setadata({ email: data.email });
        } else if (event === "event2" && res?.data?.success) {
          dispatch(setToken({ token: res?.data?.token }));
          dispatch(setUserData({ data: res?.data?.data }));
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err?.response?.data?.msg);
      });
  };
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setadata((pre) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const resendCode =()=>{
    setResending(true)
    getData
    .post(
      `/auth/resend-code`, {email : data.email}).then((res)=>{
        toast.info(res.data.msg)
        setResending(false)
      }).catch((err)=>{
        toast.warning(err.message)
        setResending(false)
      })
  }
  return (
    <section className=" w-full h-[100vh] bg-white flex items-center justify-center flex-col dark:bg-gray-700">
      <div className="flex flex-col  w-full justify-center">
        {event === "event1" ? (
          <motion.form
          animate={event === "event1"  ? show : hide }
          transition={{
              ease: "easeOut",
              duration: 0.1,
            }}
            onSubmit={(e) => handeSubmit(e)}
            className="md:w-[30%] w-[70%]  mx-auto "
          >
            <div className="relative z-0   group rounded-full flex items-center justify-center mx-auto cursor-pointer  border-2 md:w-[110px] w-[70px]   md:h-[110px] h-[70px]   ">
              <label className=" relative md:w-[100px] w-[60px]   md:h-[100px] h-[60px]">
                <Image
                  className="rounded-full object-cover"
                  src={image ? `${view?.result}` : icon}
                  alt="Icon"
                  fill
                />
                <input
                  accept="image/*"
                  className="hidden"
                  required
                  onChange={(e) => handleImageChange(e)}
                  type="file"
                  name="avatarka"
                />
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handlechange}
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <Person /> F.I kiriting
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handlechange}
                type="mail"
                name="email"
                id="email"
                className="block md:py-2.5 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <Email /> Elektron pochtangizni kiriting!
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handlechange}
                type="password"
                name="password"
                id="password"
                className="block md:py-2.5 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <Key /> Parolingizni kiriting
              </label>
              <span className="text-xs text-center block text-gray-400 mt-3">
                Agar sizda allaqachon hisob mavjud bo&apos;lsa{" "}
                <Link className="text-gray-900  font-semibold" href={"/login"}>
                  qayta kiring!
                </Link>
              </span>
            </div>
            <button
              type="submit"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full  px-5 md:py-2.5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              {loading ? <MiniLoader /> : "Yuborish!"}
            </button>
          </motion.form>
        ) : (
          <motion.div
          animate={event === "event2"  ? show : hide }
          transition={{
              ease: "easeOut",
              duration: 0.1,
            }} className="flex flex-col items-center" >
            <h4 className="text-gray-700  mb-10 border-gray-700  border rounded-md px-4" >{data?.email}</h4>
            <form
              onSubmit={(e) => handeSubmit(e)}
              className="md:w-[30%] w-[70%]  mx-auto "
            >
              <div className="relative z-0 w-full mb-6 group flex items-center text-gray-900 dark:text-white">
                <input
                  onChange={handlechange}
                  type="number"
                  name="code"
                  id="code"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  <VerifiedUser /> Tasdiqlash kodini kiriting
                </label>
              <span title="Kodni yana bir bor yuborish!" className={`${resending ? "animate-spin" :""}`} onClick={resendCode} ><RotateLeft/></span>
              </div>
              <button
                type="submit"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full  px-5 md:py-2.5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                {loading ? <MiniLoader /> : "Yuborish!"}
              </button>
            <button className="text-xs text-center  block w-full mt-10 text-gray-700 " onClick={()=> setEvent("event1")} >
              <ArrowBack sx={{width:'12px'}} className="text-xs" /> Ortga qaytish
            </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Register;
