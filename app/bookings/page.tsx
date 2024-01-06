'use client'
import { Loader } from '@/components'
import NoToken from '@/components/noToken'
import Segments from '@/components/segments'
import { getData } from '@/utils/api'
import { bookingFace } from '@/utils/types'
import {
  formatDateWithMonthNames,
  timeAgo
} from '@/utils/utils'
import {
  CancelOutlined,
  Check,
  PendingActions,
  Person2Outlined,
  PhoneInTalk,
  PlaceOutlined,
  PlayArrow,
  SmsFailed
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Bookings () {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  const [bookings, setBookings] = useState<bookingFace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token && loading) {
      getBookings()
    }
  }, [token, loading])

  const getBookings = () => {
    setLoading(true)
    getData(`bookings`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch(err => {
        toast.warning(err.response.data.message)
        setLoading(false)
        if (err.response.status === 401) {
          router.push('login')
        }
      })
  }

  const deleteGame = (id: string) => {
    getData
      .delete(`bookings/one/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then(res => {
        toast.success(res.data.msg)
        getBookings()
      })
  }

  if (!token) {
    return <NoToken />
  }
  return (
    <main className='duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5  '>
      <div>
        <Segments currentPage={"O'yinlar"} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        bookings?.map((el, i) => (
          <div
            key={i}
            className='md:w-[500px] w-[90%] border dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2 dark:text-white'
          >
            <div className='flex justify-between'>
              <span className='text-xs text-gray-900 dark:text-white'>
                <PlayArrow sx={{ width: '18px' }} />{' '}
                {formatDateWithMonthNames(el?.from)}{' '}
              </span>
              <button
                onClick={() => deleteGame(el?._id)}
                disabled={el.status === 'confirmed'}
                className='rounded border text-xs px-3'
              >
                <CancelOutlined sx={{ width: '18px' }} />
              </button>
            </div>
            <div className='flex justify-between'>
              <span className='text-xs text-gray-900 dark:text-white'>
                <Person2Outlined sx={{ width: '18px' }} />
                {el?.stadion?.owner?.name}
              </span>
              <a
                href={`tel:+${el?.stadion?.callnumber}`}
                className='text-xs text-gray-900 dark:text-white'
              >
                <PhoneInTalk sx={{ width: '18px' }} />
                {el?.stadion?.callnumber}
              </a>
            </div>
            <span className='text-xs text-gray-900 dark:text-white'>
              <PlaceOutlined sx={{ width: '18px' }} /> {el?.stadion?.destination}
            </span>
            <div className='flex justify-between items-center'>
              <span className='text-xs text-gray-900 dark:text-white'>
                {timeAgo(el?.created_at)}
              </span>
              <span className='text-xs text-gray-900 dark:text-white border px-2 py-1 rounded-sm'>
                {el?.status === 'confirmed' && <Check sx={{width : '19px'}} />}
                {el?.status === 'pending' && <PendingActions sx={{width : '19px'}} />}
                {el?.status === 'rejected' && <SmsFailed sx={{width : '19px'}} />}
              </span>
            </div>
          </div>
        ))
      )}
    </main>
  )
}

export default Bookings
