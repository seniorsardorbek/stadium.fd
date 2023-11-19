import Link from 'next/link'
import React from 'react'

function Footer() {
    return (

        <footer className="bg-white  shadow dark:bg-gray-900 z-40 border-t ">
            <div className="w-full  mx-auto p-2 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-gray-900  ">
                            myArena.uz
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-900 sm:mb-0 dark:text-white">
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6 ">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <span className="block text-sm text-gray-900 sm:text-center dark:text-white">© 2023 <a href="https://flowbite.com/" className="hover:underline">myArena</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer