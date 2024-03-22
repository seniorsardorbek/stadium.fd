'use client'
import { Bookings } from '@/src/components'
import Comments from '@/src/components/comments'
import Gallery from '@/src/components/gallery'
import { SimpleMap } from '@/src/components/map'
import { Size } from '@/src/public/icons'
import { StadiumFace } from '@/src/utils/types'
import { currency } from '@/src/utils/utils'
import { Call, CommentTwoTone, Person } from '@mui/icons-material'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined'
import React, { useState } from 'react'
import ReactStars from 'react-stars'
import 'yet-another-react-lightbox/styles.css'

const Stadion = ({ stadium }: { stadium: StadiumFace }) => {
  const [openComments, setOpenComments] = useState<boolean>(false)
  const [count, setCount] = useState<boolean>(false)

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
    <section className=' w-full '>
     <Gallery stadium={stadium} />


      <div className=' duration-100 max-w-screen-xl ] w-full   mx-auto p-2  transition-all md:p-2 '>
        <div className='flex flex-col dark:bg-gray-700 bg-gray-200 p-2 m-2 rounded-xl text-gray-700 dark:text-white text-sm md:text-base'>
          <p>
            <EditLocationOutlinedIcon sx={{ width: '20px' }} />{' '}
            {stadium?.destination}
          </p>
          <div className=' flex gap-3  '>
            <div className='w-1/2 flex flex-col gap-1'>
              <span>
                <AttachMoneyOutlinedIcon sx={{ width: '20px' }} />
                {currency(stadium?.cost || 0)}
              </span>
              <a
                className='flex items-center '
                href={`tel:${stadium?.callnumber}`}
              >
                <Call />
                {stadium?.callnumber}
              </a>
              <span className='flex  items-center'>
                <Size /> <span> {stadium?.size?.w}m</span>
                <span>{stadium?.size?.h}m</span>
              </span>
            </div>
            <div className='w-1/2 flex flex-col gap-1'>
              <ReactStars edit={false} half count={3} value={stadium?.rate} />
              <p className=''>
                <Person sx={{ width: '20px' }} /> {stadium?.owner?.name}
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
                  stadium?.description.slice(
                    0,
                    count ? stadium.description.length : 100
                  ) || ' '
              }}
              className={`text-sm p-3 m-2 dark:bg-gray-700 bg-gray-200  text-gray-950 dark:text-white   transition-height ease-in-out  duration-100  rounded-xl  `}
            ></p>
          </div>
          <Bookings stadionId={stadium?._id!} />
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <SimpleMap lat={stadium?.lat!} lng={stadium?.lng!} />
      </div>
      <Comments
        openComments={openComments}
        toggleComments={toggleComments}
        stadiumId={stadium?._id!}
      />
    </section>
  )
}

export default Stadion
