'use client'
import { Bookings, Loader } from '@/components'
import Comments from '@/components/comments'
import { SimpleMap } from '@/components/map'
import { getData } from '@/utils/api'
import { StadionType } from '@/utils/types'
import { CommentTwoTone, Person } from '@mui/icons-material'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined'
import { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { Call, Size } from '../../../public/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import CustomImage from '@/components/image'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'

function Detailed ({ params: { postId } }: { params: { postId: string } }) {
  const [stadion, setStadions] = useState<StadionType>()
  const [loader, setLoader] = useState<boolean>(true)
  const [openComments, setOpenComments] = useState<boolean>(false)
  const [count, setCount] = useState<boolean>(false)

  useEffect(() => {
    setLoader(true)
    getData(`stadions/${postId}`)
      .then(response => {
        const responseData = response.data
        setStadions(responseData)
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
        console.error('Error fetching data:', error)
      })
  }, [postId])
  function toggleComments (e: any) {
    if (openComments) {
      if (e.target.id === 'commentsWrapper') {
        setOpenComments(false)
      }
    } else {
      setOpenComments(true)
    }
  }

  return (
    <main className={`flex flex-wrap  `}>
      {loader ? (
        <Loader />
      ) : (
        <section className=' w-full '>
          <Swiper
            effect='fade'
            loop
            centeredSlides
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            autoplay={true}
            className='mySwiper -z-10'
          >
            {stadion?.images.map((image , i) => (
              <SwiperSlide key={i} className='w-full  top-0 left-0 md:h-[500px] h-[30vh]'>
                <CustomImage url={image} alt='jdjjd' fill />
              </SwiperSlide>
            ))}
          </Swiper>{' '}
          <div className=' duration-100 max-w-screen-xl ] w-full   mx-auto p-2  transition-all md:p-2 '>
            <div className='flex flex-col dark:bg-gray-700 bg-blue-50 p-2 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base'>
              <p>
                <EditLocationOutlinedIcon sx={{ width: '20px' }} />{' '}
                {stadion?.destination}
              </p>
              <div className=' flex gap-3  '>
                <div className='w-1/2 flex flex-col gap-1'>
                  <span>
                    <AttachMoneyOutlinedIcon sx={{ width: '20px' }} />
                    {stadion?.cost}so&apos;m{' '}
                  </span>
                  <a
                    className='flex items-center '
                    href={`tel:${stadion?.callnumber}`}
                  >
                    {' '}
                    <Call />
                    {stadion?.callnumber}
                  </a>
                  <span className='flex  items-center'>
                    <Size /> <span> {stadion?.size?.w}m</span>
                    <span>{stadion?.size?.h}m</span>
                  </span>
                </div>
                <div className='w-1/2 flex flex-col gap-1'>
                  <ReactStars
                    edit={false}
                    half
                    count={3}
                    value={stadion?.rate}
                  />
                  <p className=''>
                    <Person sx={{ width: '20px' }} /> {stadion?.owner?.name}
                  </p>
                  <button
                    className='flex items-start gap-2'
                    onClick={e => toggleComments(e)}
                  >
                    <CommentTwoTone sx={{ width: '20px' }} />
                    Fikrlar
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-around flex-col md:flex-row  gap-1 md:gap-0   items-start'>
              <div
                className='flex flex-col  gap-2 w-full '
                onClick={() => setCount(!count)}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      stadion?.description.slice(
                        0,
                        count ? stadion.description.length : 100
                      ) || ' '
                  }}
                  className={`text-sm p-3 m-2 dark:bg-gray-700 bg-blue-50  text-gray-950 dark:text-white   transition-height ease-in-out  duration-100  rounded-xl  `}
                ></p>
              </div>
              <Bookings stadionId={stadion?._id!} />
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <SimpleMap lat={stadion?.lat!} lng={stadion?.lng!} />
          </div>
          <Comments
            openComments={openComments}
            toggleComments={toggleComments}
            stadiumId={stadion?._id!}
          />
        </section>
      )}
    </main>
  )
}

export default Detailed
