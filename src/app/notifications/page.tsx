'use client'
import { Loader } from '@/src/components'
import MiniLoader from '@/src/components/miniloader'
import { NotificationCard } from '@/src/components/notificationCard'
import NoToken from '@/src/components/noToken'
import Segments from '@/src/components/segments'
import { api } from '@/src/utils/api'
import { EventsFace, ResponseFace } from '@/src/utils/types'
import {
  formatDateWithMonthNames,
  formatDateFromTimestamp,
  timeAgo
} from '@/src/utils/utils'
import { Check, DoneAll } from '@mui/icons-material'
import { useRouter } from 'next/navigation' // Correct the import for useRouter
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Notifications () {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<ResponseFace<EventsFace>>({
    offset: 0,
    limit: 20,
    data: [],
    total: 0
  })
  const [page, setPage] = useState<any>({ offset: 0, limit: 20 })

  useEffect(() => {
    if (token) {
      getEvents()
    }
  }, [token, page.offset])
  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if (scrolledToBottom && !loading) {
      if ((events?.offset + 1) * events?.limit < events?.total) {
        setPage((prevPage: any) => ({
          ...prevPage,
          offset: prevPage.offset + 1
        }))
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const getEvents = () => {
    setLoading(true)
    api(
      `events?${`page[offset]=${page.offset}`}${`&page[limit]=${page.limit}`}`,
      {
        headers: { authorization: `Bearer ${token}` }
      }
    )
      .then(res => {
        setEvents({ ...res.data, data: [...events.data, ...res.data.data] })
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
      .then(() => {})
      .catch(res => {
        toast.error(res.data.message)
      })
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
          {events?.data?.map((el, i) => (
            <NotificationCard
              key={i}
              el={el}
              markAsRead={markAsRead}
              prev={events?.data[i + 1]}
            />
          ))}
          {loading && <MiniLoader />}
        </div>
      </div>
    </main>
  )
}

export default Notifications
