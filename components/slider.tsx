'use client'
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import Image from 'next/image'
import React, {  useState } from 'react'

interface props {
    images: string[]
    fill: boolean
    width?: number
    height?: number
    extraClass? :string
}
function Slider({ images, fill, width, height ,extraClass }: props) {
    const [imageIndex, setImageIndex] = useState(1)
    function showNextImage() {
        setImageIndex(index => {
            if (index === images.length - 1) return 0
            return index + 1
        })
    }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         showNextImage()
    //     }, 6000);
    //     return () => clearInterval(interval);
    // }, []);
    function showPrevImage() {
        setImageIndex(index => {
            if (index === 0) return images.length - 1
            return index - 1
        })
    }
    return (
        <div className={`flex overflow-hidden relative  transition-all duration-100 ${extraClass}`}>z
            {
                images.map((el, i) => (
                    <SliderImage key={i} width={width} height={height} alt={`${i}`} imageIndex={imageIndex} url={el} fill={fill} />
                ))
            }
            <button
                onClick={showPrevImage}
                className="absolute left-0 top-[90px]"
                style={{ left: 0 }}
                aria-label="View Previous Image"
            >
                <ArrowLeft sx={{ color: "white" }} />
            </button>
            <button
                onClick={showNextImage}
                className="absolute right-0 top-[90px] z-50"
                style={{ right: 0 }}
                aria-label="View Next Image"
            >
                <ArrowRight sx={{ color: "white" }} />
            </button>
        </div>
    )
}
function SliderImage({ width, height, alt, imageIndex, url, fill }: { width?: number, height?: number, alt: string, imageIndex: number, url: string, fill: boolean }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <> {
            fill ? <Image
                src={'http://localhost:4000/' + url}
                alt={alt}
                className={`rounded-lg  transition-all    duration-300 ease-in-out group-hover:opacity-75  ${isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                    }}`}
                fill
                style={{ translate: `${-100 * imageIndex}%` }}
                onLoadingComplete={() => setIsLoading(false)}
            /> : <Image
                src={'http://localhost:4000/' + url}
                alt={alt}
                className={`rounded-lg  transition-all    duration-300 ease-in-out group-hover:opacity-75  ${isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                    }}`}
                width={width}
                height={height}
                style={{ translate: `${-100 * imageIndex}%` }}
                onLoadingComplete={() => setIsLoading(false)}
            />
        }
        </>

    )
}
export default Slider