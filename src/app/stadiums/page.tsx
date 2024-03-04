'use client'
import { Loader } from '@/src/components'
import Card from '@/src/components/card'
import Segments from '@/src/components/segments'
import { getData } from '@/src/utils/api'
import { ResponseFace, StadiumFace } from '@/src/utils/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Stadions = () => {
  const [stadions, setStadions] = useState<ResponseFace<StadiumFace>>({
    data: []
  })
  const [loader, setLoader] = useState<Boolean>(true)
  const { userLoc } = useSelector((state: any) => state.data)
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  useEffect(() => {
    getData(
      `stadions${
        userLoc
          ? `?nearby[lat]=${41.277052}&nearby[lng]=${69.233813}&nearby[maxDistance]=1000`
          : ''
      }`,
      {
        params: {
          'sort[by]': 'rate',
          'sort[order]': 'desc',
          'page[offset]': page - 1
        }
      }
    )
      .then(response => {
        const responseData = response.data
        setStadions(responseData)
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
      })
    window.document.title = 'Stadionlar - Minimatch'
  }, [userLoc, page])

  return (
    <main className='duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5 '>
      <div>
        <Segments currentPage={['Stadionlar']} />
      </div>
      <ul className='flex flex-wrap justify-center md:justify-start    '>
        {loader ? (
          <Loader />
        ) : (
          stadions?.data?.map((stadion: StadiumFace) => (
            <Card stadion={stadion} key={stadion._id} />
          ))
        )}
      </ul>
      <ul className='flex items-center justify-center space-x-1 rtl:space-x-reverse  mt-8 mx-auto'>
        <li>
          <Link
            href={
              stadions.offset === 0
                ? '/stadiums?page=1'
                : `/stadiums?page=${page - 1}`
            }
            className='flex justify-center font-semibold p-2 rounded-full transition bg-white text-black  hover:bg-primary dark:text-white dark:bg-[#191e3a]  hover:bg-blue-950 dark:hover:bg-blue-950'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 rtl:rotate-180'
            >
              <path
                d='M15 5L9 12L15 19'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </li>
        <li>
          <button
            type='button'
            className={`flex justify-center font-semibold p-2  w-10 h-10 rounded-full transition bg-white text-black  hover:bg-primary dark:text-white dark:bg-[#191e3a]  hover:bg-blue-950 dark:hover:bg-blue-950`}
          >
            {page}
          </button>
        </li>

        <li>
          <Link
            href={
              (stadions?.total || 0) / (stadions?.limit ?? 0) > page
                ? `/stadiums?page=${page + 1}`
                : `/stadiums?page=${page}`
            }
            className='flex justify-center font-semibold p-2 rounded-full transition bg-white text-black  hover:bg-primary dark:text-white dark:bg-[#191e3a]  hover:bg-blue-950 dark:hover:bg-blue-950'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='rtl:rotate-180'
            >
              <path
                d='M9 5L15 12L9 19'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </li>
      </ul>
    </main>
  )
}

export default Stadions
