import './globals.css'
import type { Metadata } from 'next'
import {  Poppins } from 'next/font/google'
import Providers from '@/app/providers'
import "react-toastify/dist/ReactToastify.css";
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
  metadataBase : new URL('https://minimatch.uz'),
  title: 'Minimatch ',
  description: "O'zingizning stadioningizni xarid qiling",
}
import 'swiper/css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} transition-all relative `}> <Providers>{children}</Providers></body>
    </html>
  )
}
