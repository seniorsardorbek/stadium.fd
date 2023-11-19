"use client";
import { setUserLoc } from "@/utils/redux/store/dataSlice";
import {
  HomeOutlined,
  LocalActivityOutlined,
  NearMe,
  NotificationImportant,
  Person,
  Settings,
  SportsSoccerOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import addNote from "react-push-notification";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import image from "../statics/1111.png";
import { userFace } from "../utils/types";
import { getData } from "@/utils/api";
import { toast } from "react-toastify";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [userdata, setUserData] = useState<userFace>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state: any) => state.data);
  useEffect(() => {}, []);
  const socket = io("localhost:4000/events");

  userdata &&
    socket.on(`newMessage-${userdata.id}`, (message) => {
      addNote({
        title: message,
        icon : "https://lh3.googleusercontent.com/a/ACg8ocJrXeJt9Pe2zbiwgcfG-HiYPcG7DKhaFDi1PDb4ZIXhuw=s360-c-no" ,
        message: message,
        duration: 4000,
        native: true,
        onClick: () => {
          router.push("notifications");
        },
      });
    });
console.log(userdata);
  useEffect(() => {
    getLocation();
 token &&   getData("users/me", { headers: { authorization: `Bearer ${token}` } }).then(
      (res) => {
        setUserData(res.data.data);
      }
    ).catch((err) =>{
      toast.error(err.message)
    });
    const userPrefersDark = localStorage.getItem("darkMode");
    if (userPrefersDark === "true") {
      setDarkMode(true);
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderShrunk(true);
      } else {
        setIsHeaderShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token ]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLoc({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          })
        );
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }
  return (
    <header
      className={`transition-all md:transition-none fixed  w-full top-0 duration-200  z-[50] bg-white dark:bg-gray-950 border-gray-200 ${
        isHeaderShrunk ? " boxShadow " : ""
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href="/" className="flex items-center w-[140px] md:w-[200px]">
          <Image src={image} alt="Logo" width={200} />
        </Link>
        <div className="flex items-center md:order-2">
          <div
            onClick={toggleDarkMode}
            className={`tdnn ${!darkMode && "day"}`}
          >
            <div className={`moon ${!darkMode && "sun"}`}></div>
          </div>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-[1px] focus:ring-gray-300 dark:focus:ring-gray-100"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <div className="relative bg-gradient-to-b hover:bg-gradient-r-to  from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% inline-flex items-center justify-center w-10 h-10 overflow-hidden    rounded-full ">
              {userdata?.avatarka ? (
                <Image
                  className="object-cover rounded-full w-9 h-9"
                  src={"http://localhost:4000/" + userdata?.avatarka}
                  alt="Profile picture"
                  width={35}
                  height={35}
                />
              ) : (
                <svg
                  className="  object-cover mb-0  w-8 h-8 text-gray-600 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 1 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </button>
         
          <div
            className={` absolute top-10 border-[1px] dark:border-none border-gray-900 right-[8%]  z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
              isDropdownOpen ? "" : "hidden"
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3 ">
              <span className="block text-sm text-white-900 dark:text-white">
                {userdata?.name || "You not loging"}
              </span>
              <span className="block text-sm text-white-900 dark:text-white">
                {userdata?.email || "You not loging"}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white  dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                >
                  <span className="visible md:hidden">
                    <Person />
                  </span>{" "}
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white  dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                >
                  <span className="visible md:hidden">
                    <Settings />
                  </span>{" "}
                  Sozlamalar
                </Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link
                  href="/notifications"
                  className={`block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white  dark:hover:bg-gray-600 dark:text-white dark:hover:text-white`}
                >
                  <span className="visible md:hidden">
                    <NotificationImportant />
                  </span>{" "}
                  Bildirishnomalar
                </Link>
              </li>
              <li>
                {userdata ? (
                  <Link
                    href="/signout" // Update this to the appropriate sign-out route
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                  >
                    Chiqish
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                  >
                    Kirish
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className={` flex-col justify-center  gap-[7px] z-[1000]  w-8 h-8 p-1 md:hidden inline-flex  box-content  rounded-lg hover:border-1 ${
              isMenuOpen ? "items-center" : ""
            }`}
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen
                  ? "-rotate-45  w-[50%] translate-y-[3px] translate-x-[6px] "
                  : "w-[50%]"
              } `}
            ></span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen ? "rotate-45 w-[100%]" : "w-[75%]"
              } `}
            ></span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen
                  ? "-rotate-45 w-[50%] translate-y-[-3px] translate-x-[-6px] "
                  : "w-[100%]"
              } `}
            ></span>
          </button>
        </div>
        <div
          onClick={toggleMenu}
          className={` md:hidden md:bg-transparent md:h-auto md:w-auto md:pt-0  flex justify-end  md:right-auto absolute w-[100%] h-[100vh] top-0 right-0   bg-black bg-opacity-50   z-20   transition-all duration-200 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-user"
        ></div>
        <ul
          className={`   flex flex-col md:flex-row gap-3 md:translate-x-0 md:gap-0 transition-all duration-300 z-30  dark:bg-gray-900 bg-white   md:bg-transparent md:dark:bg-transparent  fixed md:relative  h-[100vh]  md:h-auto w-[60%] md:w-auto   top-0 right-0 font-medium p-4 md:p-0  pt-20       md:space-x-8 md:pt-0  md:border-0   ${
            !isMenuOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <li onClick={toggleMenu}>
            <Link
              href="/"
              className={`flex items-center gap-3 px-2 bg-slate-100 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent   text-gray-900 dark:text-white rounded `}
            >
              <span className="visible md:hidden">
                <HomeOutlined />
              </span>{" "}
              Bosh sahifa
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href="/stadiums"
              className={`  flex items-center gap-3 px-2 bg-slate-100 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className="visible md:hidden">
                <SportsSoccerOutlined />
              </span>
              Stadionlar
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href="/bookings"
              className={`  flex items-center gap-3 px-2 bg-slate-100 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className="visible md:hidden">
                <LocalActivityOutlined />
              </span>{" "}
              Bookinglar
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href="/nearest"
              className={`  flex items-center gap-3 px-2 bg-slate-100 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className="visible md:hidden">
                <NearMe />
              </span>{" "}
              Atrofdagilar
            </Link>
          </li>
        </ul>
      </div>
      <div  onClick={toggleDropdown} className={ ` fixed  top-0 left-0 w-full h-[100vh] bg-black bg-opacity-60 ${isDropdownOpen ? "" : "hidden" }`} ></div>
    </header>
  );
}
export default Header;
