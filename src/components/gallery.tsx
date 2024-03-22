import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import NextJsImage from '@/src/components/nextimage'
import { slideImageConfig } from '@/src/utils/config/slideImages'
import 'yet-another-react-lightbox/styles.css'
import { Inline } from 'yet-another-react-lightbox/plugins'
import { StadiumFace } from '../utils/types'
function Gallery ({ stadium }: { stadium: StadiumFace }) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const toggleOpen = (state: boolean) => () => setOpen(state)

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current)

  return (
    <>
    <div className="absolute bg-gradient-to-b from-gray-100 to-transparent w-full md:h-[73px] h-14 z-30 "></div>
      <Lightbox
        render={{ slide: NextJsImage }}
        index={index}
        slides={slideImageConfig(stadium.images)}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true)
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: 'cover'
        }}
        inline={{
          style: {
            maxHeight: '80vh',
            width: '100%',
            aspectRatio: '5 / 3',
            margin: '0 auto'
          }
        }}
      />
      <Lightbox
        render={{ slide: NextJsImage }}
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slideImageConfig(stadium.images)}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      />
    </>
  )
}

export default Gallery
