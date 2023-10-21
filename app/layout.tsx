import { Header } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'
import Providers from '@/utils/redux/Providers'
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
export const metadata: Metadata = {
  title: 'Stadion rent ',
  description: "O'zingizning stadioningizni xarid qiling",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} transition-all`}> <Providers>  {children}</Providers></body>
    </html>
  )
}
