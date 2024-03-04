import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
const inter = Poppins({
  subsets: ['latin'],
  weight: '400'
})
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
export const metadata: Metadata = {
  metadataBase: new URL('https://minimatch.uz'),
  title: {
    default: 'Minimatch',
    template: '%s - Minimatch'
  },
  description:
    "O'zbekiston bo'yicha stadionlarni bron qilish tizimi, Minimatch bilan osonroq. Stadionlarni avtomatlashtirish uchun platforma.",
  keywords: [
    'minimatch',
    'futbol',
    'bron',
    'qilish',
    'toshkent',
    'stadion',
    'stadionlar',
    'xabarlar'
  ],
  verification: {
    google: 'V72WlsYwic7sLCGXvMWNBq27wpCgSfUkZgJoVL0GBLI'
  },
  twitter :{
    card :"summary_large_image"
  } ,
  
}

import 'swiper/css'
import Providers from './providers'
export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}relative`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
