import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Email, Instagram, Telegram, YouTube } from "@mui/icons-material";
function Footer() {
  return (
    <footer className=" z-40 border-t       ">
      <div className="w-full max-w-screen-xl   mx-auto p-2 flex flex-col justify-center ">
        <div className="flex  items-center justify-between flex-col md:flex-row md:p-3 p-1">
          <ul className="flex items-center gap-4 " >
            <li className="dark:text-white text-gray-900 " ><Link href={'#'} > <Instagram/></Link></li>
            <li className="dark:text-white text-gray-900 " ><Link href={'#'} > <Telegram/></Link></li>
            <li className="dark:text-white text-gray-900 " ><Link href={'#'} > <YouTube/></Link></li>
            <li className="dark:text-white text-gray-900 " ><Link href={'#'} > <Email/></Link></li>
          </ul>
          <ul className="flex flex-wrap  items-center justify-center  text-sm font-medium dark:text-white text-gray-900">
            <li>
              <Link href="#" className=" mr-2 text-xs md:text-md hover:underline md:mr-6 ">
                Biz haqimizda
              </Link>
            </li>
            <li>
              <Link href="#" className=" mr-2 text-xs md:text-md hover:underline md:mr-6">
                Xavfsizlik shartlari
              </Link>
            </li>
            <li>
              <Link href="#" className=" mr-2 text-xs md:text-md hover:underline md:mr-6 ">
                Litsensiya
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Boglanish
              </Link>
            </li>
          </ul>
        </div>
        <span className="block text-xs md:text-md mx-auto  sm:text-center dark:text-white text-gray-900 mb-2">
          © 2023
          <Link href="/" className="hover:underline">
            MiniMatch
          </Link>
          . Barcha huquqlar hinoyalangan.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
