import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "../statics/1111.png";
function Footer() {
  return (
    <footer className="bg-white  shadow dark:bg-gray-950 z-40 border-t ">
      <div className="w-full max-w-screen-xl   mx-auto p-2 flex flex-col justify-center ">
        <div className="flex  items-center justify-between md:p-3 p-1">
          <ul className="flex flex-wrap  items-center justify-center  text-sm font-medium text-gray-900  dark:text-white">
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
        <span className="block text-xs md:text-md mx-auto text-gray-900 sm:text-center dark:text-white mb-2">
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
