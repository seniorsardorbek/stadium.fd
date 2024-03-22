'use client'
import { Loader } from '@/src/components'
import NoToken from '@/src/components/noToken'
import Segments from '@/src/components/segments'
import { api } from '@/src/utils/api'
import { EventsFace } from '@/src/utils/types'
import { formatDateWithMonthNames, formatDateFromTimestamp, timeAgo } from '@/src/utils/utils'
import { Check, DoneAll } from '@mui/icons-material'
import { useRouter } from 'next/navigation'; // Correct the import for useRouter
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Notifications () {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<EventsFace[]>([])

  useEffect(() => {
    if (token && loading) {
      getEvents()
    }
  }, [loading, token])

  const getEvents = () => {
    setLoading(true)
    api(`eventss?page[limit]=5`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        toast.warning(err.response.data.message)
        if (err.response.status === 401) {
          router.push('login')
        }
      })
  }

  const markAsRead = (id: string) => {
    api
      .put(
        `eventss/${id}`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(() => {
  
      })
      .catch(res => {
        toast.error(res.data.message)
      })
  }

  function Notif ({ el  , prev}: { el:EventsFace  ,prev: EventsFace  }) {
    return (
      <div
        onClick={() => !el.viewed && markAsRead(el._id)}
        className='flex mx-auto cursor-pointer'
      >
        <p className='text-[#3b3f5c] dark:text-gray-300 min-w-[80px] max-w-[180px] text-base font-semibold p-2.5 py-8'>
          { formatDateFromTimestamp(el?.created_at) == formatDateFromTimestamp(prev?.created_at) ?  "" : formatDateFromTimestamp(el?.created_at)}
        </p>
        <div className='relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before: before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2  after:rounded-full'></div>
        <div className='p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5'>
          <p className='text-[#3b3f5c] dark:text-gray-300 font-semibold text-[13px]'>
            {el?.message} tomonidan {el?.eventBy?.name}
          </p>
          <p>
            {!el?.viewed ? (
              <Check sx={{ color: 'white', width: '14px ' }} />
            ) : (
              <DoneAll sx={{ color: 'white', width: '14px ' }} />
            )}
          </p>
          <p className='text-gray-500 text-xs font-bold self-center min-w-[100px] max-w-[100px]'>
            {formatDateWithMonthNames(el?.created_at)}
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return <NoToken />
  }

  return (
    <main className='duration-100 flex-1 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5 '>
      <div>
        <Segments currentPage={['Bildirishnomalar']} />
      </div> 
      <div className='mb-5 mx-auto'>
        <div className='max-w-[900px] mx-auto'>
          {loading ? (
            <Loader />
          ) : (
            events?.map((el, i) => <Notif key={i} el={el} prev={events[i+1]} />)
          )}
        </div>
      </div>
    </main>
  )
}

export default Notifications
