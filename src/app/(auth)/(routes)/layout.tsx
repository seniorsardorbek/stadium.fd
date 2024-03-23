import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Kirish"
}
function RootLayout({children} : {children :React.ReactNode}) {
  return (
    <main className='flex-1'>{children}</main>
  )
}

export default RootLayout