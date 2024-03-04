'use client'
import { Loader } from '@/src/components'
import { getData } from '@/src/utils/api'
import { StadiumFace } from '@/src/utils/types'
import { formatNumber } from '@/src/utils/utils'
import {
  Clusterer,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl
} from '@pbe/react-yandex-maps'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Page () {
  const { userLoc } = useSelector((state: any) => state.data)
  const [stadions, setStadions] = useState<StadiumFace[]>([])
  const [loader, setLoader] = useState<Boolean>(true)
  const history = useRouter()

  useEffect(() => {
    if ( loader) {
      getData(
        `stadions${
          userLoc
            ? `?nearby[lat]=${userLoc?.lat}&nearby[lng]=${userLoc?.lng}&nearby[maxDistance]=1000`
            : ''
        }`,
        {
          params: {
            'sort[by]': 'rate',
            'sort[order]': 'desc'
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
          console.error('Error fetching data:', error)
        })
    }
  }, [loader])

  const handlePlacemarkClick = (_id: string) => {
    history.push(`stadiums/${_id}`)
  }

  return (
    <main className='mt-16 relative w-full'>
      { 
        loader ? (
          <Loader />
        ) : (
          <YMaps
            query={{
              suggest_apikey: 'd6731aa6-00f1-4319-9583-87938fbc50f9',
              apikey: 'd6731aa6-00f1-4319-9583-87938fbc50f9'
            }}
          >
            <Map
              className='w-full h-[77vh] absolute'
              defaultState={{
                center: [userLoc.lat , userLoc.lng ],
                zoom: 14
              }}
            >
              <ZoomControl options={{ zoomDuration: 400 }} />
              <GeolocationControl />
              <Clusterer
                options={{
                  preset: 'islands#invertedVioletClusterIcons',
                  groupByCoordinates: false
                }}
              >
                {stadions.map((coordinates, index) => (
                  <Placemark
                    onClick={() => handlePlacemarkClick(coordinates._id)}
                    key={index}
                    properties={{ iconCaption: formatNumber(coordinates.cost) }}
                    options={{ preset: '', iconColor: 'red' }}
                    geometry={[coordinates.lat, coordinates.lng]}
                  />
                ))}
              </Clusterer>
            </Map>
          </YMaps>
        )
                }
    </main>
  )
}

export default Page
