'use client'
import { useEffect, useState } from 'react'
import Card from '@/src/components/card'
import Segments from '@/src/components/segments'
import { useSelector } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { StadiumFace } from '@/src/utils/types'
import { getData } from '@/src/utils/api'
import { Loader } from '@/src/components'
import {  useSearchParams } from 'next/navigation'

const Stadions = () => {
  const [stadions, setStadions] = useState<StadiumFace[]>([])
  const [loader, setLoader] = useState<Boolean>(true)
  const { UserLoc } = useSelector((state: any) => state.data)
  const searchParams = useSearchParams()
 
  const page = searchParams.get('page')
  console.log(page);
  useEffect(() => {
    getData(
      `stadions${
        UserLoc
          ? `?nearby[lat]=${41.277052}&nearby[lng]=${69.233813}&nearby[maxDistance]=1000`
          : ''
      }`,
      {
        params: {
          'sort[by]': 'rate',
          'sort[order]': 'desc',
          'page[offset]': parseInt(page || "")-1,
        }
      }
    )
      .then(response => {
        const responseData = response.data.data
        setStadions(responseData)
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
      })
      window.document.title = "Stadionlar - Minimatch"
  }, [UserLoc])

  return (
    <main className='duration-100 max-w-screen-xl min-h-[65vh] w-full   mx-auto p-2  transition-all mt-12 md:p-5 '>
      <div>
        <Segments currentPage={["Stadionlar"]} />
      </div>
      <ul className='flex flex-wrap justify-center md:justify-start    '>
        {loader ? (
          <Loader />
        ) : (
          stadions.map((stadion: StadiumFace, index) => (
            <Card stadion={stadion} key={stadion._id} />
          ))
        )}
      </ul>
    </main>
  )
}

export default Stadions
