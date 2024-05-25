'use client'
import Image from 'next/image'
import { FC, useState } from 'react'
import { SERVER } from '../utils/api'

interface Props {
  url: string | File
  alt: string
  extraClass?: string
  width?: number
  height?: number
  fill?: boolean
}

const CustomImage: FC<Props> = ({
  url,
  alt,
  fill,
  extraClass,
  width,
  height
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {fill ? (
        <Image
          src={SERVER + url}
          alt={alt}
          className={` block   object-cover  duration-700 ease-in-out group-hover:opacity-75 ${extraClass} ${
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }}`}
          fill
          priority={true}
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={SERVER + url}
          alt={alt}
          className={` block   object-cover  duration-700 ease-in-out group-hover:opacity-75 ${extraClass} ${
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }}`}
          priority={true}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </>
  )
}

export default CustomImage
