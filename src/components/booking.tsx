'use client'
import {
  Call,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import { BookingFace } from '../utils/types'
import {
  getCurrentFormattedDate,
  getMillisecondsForAllHours,
  hide,
  show
} from '../utils/utils'
import MiniLoader from './miniloader'
import MaskedInput from 'react-text-mask'
interface Props {
  stadionId?: string
}

const Bookings: FC<Props> = ({ stadionId }) => {
  const [bookings, setbookings] = useState<BookingFace[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [data, setData] = useState<{
    callnumber?: string
    from?: number
    stadion?: string
  }>({})
  const [loader, setLoader] = useState<boolean>(false)
  const [visible, setvisibe] = useState<boolean>(false)
  const { token } = useSelector((state: any) => state.data)

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(pre => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }
  const currentFormattedDate = getCurrentFormattedDate(currentDate)

  const handleNextDayClick = () => {
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(nextDate)
  }
  const handlePreDayClick = () => {
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(nextDate)
  }
  var date = new Date(currentFormattedDate)
  var hoursInMilliseconds = getMillisecondsForAllHours(date)

  useEffect(() => {
    api(`bookings/${stadionId}`).then(data => {
      setbookings(data.data)
    })
  }, [stadionId])

  function bookingfunction (time: number) {
    setData({ from: time, stadion: stadionId })
    setvisibe(true)
  }
  function Bookingsubmit (e: React.FormEvent) {
    e.preventDefault()
    setLoader(true)
    api
      .post('bookings', data, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        toast.success(res.data?.msg)
      })
      .catch(err => {
        console.log(err)
        toast.error(
          err.response?.data?.msg ||
            err.response?.data?.message[0] ||
            'Malumot togriligiga ishonch hosil qiling'
        )
      })
      .finally(() => {
        setData(pre => ({
          ...data,
          callnumber: '+998'
        }))
        setLoader(false)
        setvisibe(false)
      })
  }
  function Hours ({ i, value }: hoursProps) {
    const booked: boolean = bookings.some(
      bookingDetail => bookingDetail.from === value
    )
    const givenDate = new Date(value)
    return (
      <button
        title={
          !token
            ? 'Tizimga oldin kiring'
            : 'Buyurtma uchun kerakli vaqtni tanlang'
        }
        onClick={() => bookingfunction(value)}
        disabled={booked || new Date() > givenDate}
        className={` cursor-pointer border border-gray-900 md:w-24 w-20 h-10 text-gray-950 dark:text-white  ${
          new Date() > givenDate && ' text-red-900 dark:text-red-400 '
        } ${booked && ' cursor-not-allowed  text-green-950 bg-red-700 '}`}
        data-value={value}
      >
        {i}:00
      </button>
    )
  }

  return (
    <div className='flex gap-3 dark:bg-gray-700 bg-gray-200 m-2 p-2  rounded-xl flex-col text-gray-700'>
      <div className='flex items-center justify-center gap-4'>
        <button
          className='border-2 border-gray-900  dark:text-white rounded-lg active:scale-95 '
          onClick={handlePreDayClick}
        >
          <KeyboardArrowLeft sx={{ rotate: '180' }} />
        </button>
        <h1 className=' text-gray-900 dark:text-white'>
          {currentFormattedDate}
        </h1>
        <button
          className='border-2 border-gray-900 dark:text-white rounded-lg active:scale-95'
          onClick={handleNextDayClick}
        >
          <KeyboardArrowRight />
        </button>
      </div>
      <div className='flex flex-col'>
        <div className='flex  flex-wrap  justify-center '>
          {hoursInMilliseconds?.map((el, i) => {
            return <Hours key={i} i={i} value={el} />
          })}
        </div>
        <div className='flex items-center gap-2 mx-auto mt-3 dark:text-white'>
          <p className='flex  items-center text-xs '>
            <span className='bg-red-700 mr-1 rounded-full w-3 h-3'></span>Vaqt
            tugagan
          </p>
          <p className='flex  items-center text-xs '>
            <span className='bg-green-700 mr-1 rounded-full w-3 h-3'></span>
            O&apos;yin rejalashtirilgan
          </p>
          <p className='flex  items-center text-xs '>
            <span className='bg-blue-700 mr-1 rounded-full w-3 h-3'></span>Siz
            uchun
          </p>
        </div>
      </div>
      <div>
        <div
          className={` bg-black  z-10 bg-opacity-60 ${
            visible ? 'fixed' : 'hidden'
          } top-0 left-0 w-full h-[100vh] flex items-center  justify-center`}
        >
          <motion.div
            animate={visible ? show : hide}
            drag='y'
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            className='relative w-[80%] max-w-md max-h-full'
          >
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              <button
                onClick={() => setvisibe(false)}
                type='button'
                className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <svg
                  className='w-3 h-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
              <div className='px-6 py-6 lg:px-8 '>
                <h3 className='mb-4 md:text-xl text-lg text-center  font-medium text-gray-700 dark:text-white'>
                  So&apos;rov yuborish uchun formani to&apos;ldiring
                </h3>
                <form
                  onSubmit={e => Bookingsubmit(e)}
                  className='space-y-6'
                >
                  <fieldset  className=' w-full flex justify-center items-center gap-3 '>
                    <MaskedInput
                      onChange={e => handlechange(e)}
                      id='phoneMask'
                      type='text'
                      value={data?.callnumber}
                      className='focus:outline-none rounded-md  text-md py-2 text-sm font-semibold  text-gray-900 w-[63%]'
                      defaultValue={'+998'}
                      name='callnumber'
                      required={true}
                      mask={[
                        '+',
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        '-',
                        /[0-9]/,
                        /[0-9]/,
                        '-',
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        '-',
                        /[0-9]/,
                        /[0-9]/,
                        '-',
                        /[0-9]/,
                        /[0-9]/
                      ]}
                    />
                  </fieldset>
                  <button
                    type='submit'
                    className='w-full  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                  >
                    {loader ? <MiniLoader /> : 'Tasdiqlash'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
interface hoursProps {
  i: number
  value: number
}

export default Bookings
