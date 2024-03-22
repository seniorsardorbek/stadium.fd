'use client'
import { Loader } from '@/src/components'
import NoToken from '@/src/components/noToken'
import Segments from '@/src/components/segments'
import { api } from '@/src/utils/api'
import { BookingFace, ResponseFace } from '@/src/utils/types'
import { formatDateWithMonthNames, timeAgo } from '@/src/utils/utils'
import {
  CancelOutlined,
  Person2Outlined,
  PhoneInTalk,
  PlaceOutlined,
  PlayArrow
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from '../../utils/toast'
function Bookings () {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  const [bookings, setBookings] = useState<ResponseFace<BookingFace>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token && loading) {
      getBookings()
    }
  }, [token, loading])

  const getBookings = () => {
    setLoading(true)
    api(`bookings/me?sort[order]=desc&sort[by]=updated_at`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(res => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch(err => {
        toast.fire(err.response?.data?.message)
        setLoading(false)
        if (err.response.status === 401) {
          router.push('login')
        }
      })
  }

  const deleteGame = (id: string) => {
    Swal.fire({
      icon: 'warning',
      title: `O'chirishga aminmisiz?`,
      text: 'Qayta tiklash imkoni mavjud',
      showCancelButton: true,
      confirmButtonText: "O'chirish",
      cancelButtonText: 'Bekor qilsih',
      padding: '2em',
      customClass: 'sweet-alerts'
    })
      .then(async result => {
        if (result.isConfirmed) {
          api
            .delete(`bookings/one/${id}`, {
              headers: { authorization: `Bearer ${token}` }
            })
            .then(res => {
              toast.fire(res.data.msg)
              getBookings()
            })
        }
      })
      .catch(error => {
        toast.fire({ title: 'Error when deleting' })
      })
      .finally(() => {
        // setLoading('noaction');
      })
  }

  if (!token) {
    return <NoToken />
  }
  console.log(bookings)
  return (
    <main className='duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5  '>
      <div>
        <Segments currentPage={["O'yinlar"]} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        bookings?.data?.map((el, i) => (
          <div
            key={i}
            className={`md:w-[500px] w-[90%]  dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2 dark:text-white border-2  ${
              el?.status === 'confirmed'
                ? 'border-green-900'
                : el?.status === 'rejected'
                ? 'border-red-900'
                : el?.status === 'pending'
                ? 'border-orange-500'
                : ''
            } `}
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
                href={`tel:${el?.stadion?.callnumber}`}
                className='text-xs text-gray-900 dark:text-white'
              >
                <PhoneInTalk sx={{ width: '18px' }} />
                {el?.stadion?.callnumber}
              </a>
            </div>
            <Link
              href={`/stadiums/${el?.stadion?._id}`}
              className='text-xs text-gray-900 dark:text-white underline font-semibold'
            >
              <PlaceOutlined sx={{ width: '18px' }} />{' '}
              {el?.stadion?.destination}
            </Link>
            <div className='flex justify-between items-center'>
              <span className='text-xs text-gray-900 dark:text-white'>
                {timeAgo(el?.created_at)}
              </span>
              <span
                className={`text-xs text-gray-900 dark:text-white border px-2 py-1 rounded-sm ${
                  el?.status === 'confirmed'
                    ? 'text-green-900'
                    : el?.status === 'rejected'
                    ? 'text-red-900'
                    : el?.status === 'pending'
                    ? 'text-orange-300'
                    : ''
                }
              }`}
              >
                {el?.status === 'confirmed'
                  ? 'Tasdiqlandi'
                  : el?.status === 'rejected'
                  ? 'Rad etildi'
                  : el?.status === 'pending'
                  ? 'Kutilmoqda'
                  : ''}
              </span>
            </div>
          </div>
        ))
      )}
    </main>
  )
}

export default Bookings
