'use client'
import {
  Bolt,
  HomeOutlined,
  LocalActivityOutlined,
  LogoutOutlined,
  NearMe,
  NotificationImportant,
  SportsSoccerOutlined
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import logo from '../statics/1111.png'
import darkLogo from '../statics/logo.png'
import { api } from '../utils/api'
import { UserFace } from '../utils/types'
import {
  isLocalStorageAvailable,
  setUserLoc
} from '../utils/redux/store/dataSlice'
import { hide, show } from '../utils/utils'
import { textSlicer } from '../utils/textslicer'
function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false)
  const [userdata, setUserData] = useState<UserFace>()
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  // const socket = io('bd.minimatch.uz/events')
  // userdata &&
  //   socket.on(`newMessage-${userdata._id}`, (message: any) => {
  //     console.log('salom')
  //     addNote({
  //       title: 'Yangi xabar Minimtachdan!',
  //       icon: 'https://lh3.googleusercontent.com/a/ACg8ocJrXeJt9Pe2zbiwgcfG-HiYPcG7DKhaFDi1PDb4ZIXhuw=s360-c-no',
  //       message: message,
  //       duration: 4000,
  //       native: true,
  //       onClick: () => {
  //         router.push('notifications')
  //       }
  //     })
  //   })

  useEffect(() => {
    getLocation()
    token &&
      api('users/me', { headers: { authorization: `Bearer ${token}` } })
        .then(res => {
          setUserData(res.data.data)
        })
        .catch(err => {
          toast.error(err.message)
        })
  }, [token])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the threshold value as needed
      const threshold = 30
      const isScrolled = window.scrollY > threshold

      setIsHeaderShrunk(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const toggleMenu = () => {
    setIsDropdownOpen(false)
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsMenuOpen(false)
    setIsDropdownOpen(!isDropdownOpen)
  }

  function toggleDarkMode () {
    setDarkMode(!darkMode)
  }
  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLoc({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          })
        )
      })
    } else {
      toast.error('Geolocation is not supported by this browser.')
    }
  }
  function sighout () {
    Cookies.remove('passport')
    isLocalStorageAvailable() && localStorage.removeItem('userdata')
    window.location.reload()
  }
  return (
    <header
      className={`transition-all md:transition-none fixed   w-full top-0 duration-200  z-[50]  border-gray-200  ${
        isHeaderShrunk
          ? ' boxShadow  backdrop-blur-3xl bg-gray-200 dark:bg-slate-900 backdrop-opacity-50  '
          : ''
      }`}
    >
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
        <Link href='/' className='flex items-center w-[140px] md:w-[200px]'>
          {darkMode ? (
            <Image src={logo} alt='Logo' width={200} />
          ) : (
            <Image src={darkLogo} alt='Logo' width={200} />
          )}
        </Link>
        <div className='flex items-center md:order-2'>
          {/* <div
            onClick={toggleDarkMode}
            className={`tdnn ${!darkMode && 'day'}`}
          >
            <div className={`moon ${!darkMode && 'sun'}`}></div>
          </div> */}
          {token ? (
            <>
              <button
                onClick={toggleDropdown}
                className='block px-1 py-1 rounded border border-gray-950 text-sm text-gray-900    dark:text-white  mr-1'
              >
                {textSlicer(userdata?.name || '', 20)}{' '}
                <Bolt sx={{ width: '20px' }} />
              </button>
              <motion.div
                animate={isDropdownOpen ? show : hide}
                transition={{
                  ease: 'easeOut',
                  duration: 0.1,
                  x: { duration: 5 }
                }}
                className={` absolute top-12 right-[15%]  z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                  isDropdownOpen ? '' : 'hidden'
                }`}
                id='user-dropdown'
              >
                <div className='px-4 py-3 '>
                  <span className='block text-sm text-white-900 dark:text-white'>
                    {userdata?.name}
                  </span>
                  <span className='block text-xs text-white-900 dark:text-white overflow-scroll md:overflow-auto w-44 '>
                    {userdata?.phonenumber}
                  </span>
                </div>
                <ul className='py-2 ' aria-labelledby='user-menu-button'>
                  <li onClick={toggleDropdown}>
                    <Link
                      href='/notifications'
                      className={`block px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white  dark:hover:bg-gray-600 dark:text-white dark:hover:text-white`}
                    >
                      <span className='visible md:hidden'>
                        <NotificationImportant />
                      </span>{' '}
                      Bildirishnomalar
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={sighout}
                      className='block w-full text-start px-4 py-2 text-sm text-gray-900 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:text-white dark:hover:text-white'
                    >
                      <LogoutOutlined /> Chiqish
                    </button>
                  </li>
                </ul>
              </motion.div>
            </>
          ) : (
            <Link
              href='/login'
              className='block px-4 py-2 rounded border text-sm text-gray-900 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:text-white dark:hover:text-white'
            >
              Kirish <Bolt />
            </Link>
          )}

          <button
            data-collapse-toggle='navbar-user'
            type='button'
            className={` flex-col justify-center  gap-[7px] z-[1000]  w-8 h-8 p-1 md:hidden inline-flex  box-content  rounded-lg hover:border-1 ${
              isMenuOpen ? 'items-center' : ''
            }`}
            aria-controls='navbar-user'
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen
                  ? '-rotate-45  w-[50%] translate-y-[3px] translate-x-[6px] '
                  : 'w-[50%]'
              } `}
            ></span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen ? 'rotate-45 w-[100%]' : 'w-[75%]'
              } `}
            ></span>
            <span
              className={` h-[2px] rounded-lg bg-gray-900 transition-transform dark:bg-white  ${
                isMenuOpen
                  ? '-rotate-45 w-[50%] translate-y-[-3px] translate-x-[-6px] '
                  : 'w-[100%]'
              } `}
            ></span>
          </button>
        </div>
        <div
          onClick={toggleMenu}
          className={` md:hidden md:bg-transparent md:h-auto md:w-auto md:pt-0  flex justify-end  md:right-auto absolute w-[100%] h-[100vh] top-0 right-0   bg-black bg-opacity-50   z-20   transition-all duration-200  ${
            isMenuOpen ? '' : 'hidden'
          }`}
          id='navbar-user'
        ></div>
        <ul
          className={`   flex flex-col md:flex-row gap-3 md:translate-x-0 md:gap-0 transition-all duration-300 z-30  dark:bg-gray-900 bg-white   md:bg-transparent md:dark:bg-transparent  fixed md:relative  h-[100vh]  md:h-auto w-[60%] md:w-auto   top-0 right-0 font-medium p-4 md:p-0  pt-20       md:space-x-8 md:pt-0  md:border-0  ${
            !isMenuOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <li onClick={toggleMenu}>
            <Link
              href='/'
              className={`flex items-center gap-3 px-2 bg-gray-200 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent   text-gray-900 dark:text-white rounded `}
            >
              <span className='visible md:hidden'>
                <HomeOutlined />
              </span>{' '}
              Bosh sahifa
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href='/stadiums'
              className={`  flex items-center gap-3 px-2 bg-gray-200 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className='visible md:hidden'>
                <SportsSoccerOutlined />
              </span>
              Stadionlar
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href='/bookings'
              className={`  flex items-center gap-3 px-2 bg-gray-200 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className='visible md:hidden'>
                <LocalActivityOutlined />
              </span>{' '}
              O&apos;yinlar
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link
              href='/nearest'
              className={`  flex items-center gap-3 px-2 bg-gray-200 dark:bg-slate-950  h-10 md:h-auto md:bg-transparent md:dark:bg-transparent  text-gray-900 dark:text-white rounded `}
            >
              <span className='visible md:hidden'>
                <NearMe />
              </span>{' '}
              Yaqinroq
            </Link>
          </li>
        </ul>
      </div>
      <div
        onClick={toggleDropdown}
        className={`transition-all inset-0 overflow-y-auto  duration-500 fixed  top-0 left-0 w-full h-[100vh] bg-black bg-opacity-60 ${
          isDropdownOpen ? 'visible' : 'hidden'
        }`}
      ></div>
    </header>
  )
}
export default Header
