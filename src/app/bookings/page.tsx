'use client'
import BookingCard from '@/src/components/bookingCard'
import MiniLoader from '@/src/components/miniloader'
import NoToken from '@/src/components/noToken'
import Segments from '@/src/components/segments'
import { api } from '@/src/utils/api'
import { BookingFace, ResponseFace } from '@/src/utils/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from '../../utils/toast'
function Bookings () {
  const router = useRouter()
  const { token } = useSelector((state: any) => state.data)
  const [bookings, setBookings] = useState<ResponseFace<BookingFace>>({
    offset: 0,
    limit: 20,
    data: [],
    total: 0
  })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<any>({ offset: 0, limit: 20 })

  useEffect(() => {
    if (token) {
      getBookings()
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
      if ((bookings?.offset + 1) * bookings?.limit < bookings?.total) {
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
  const getBookings = () => {
    setLoading(true)
    api(
      `bookings/me?sort[order]=desc&sort[by]=updated_at${`&page[offset]=${page.offset}`}${`&page[limit]=${page.limit}`}`,
      {
        headers: { authorization: `Bearer ${token}` }
      }
    )
      .then(res => {
        setBookings({ ...res.data, data: [...bookings.data, ...res.data.data] })
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
  return (
    <main className='duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5  '>
      <div>
        <Segments currentPage={["O'yinlar"]} />
      </div>
      {loading && <MiniLoader />}
      {bookings?.data?.map((el, i) => (
        <BookingCard el={el} key={i} deleteGame={deleteGame} />
      ))}
    </main>
  )
}

export default Bookings
