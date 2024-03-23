import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: "Xaritada yanada yaxshiroq"
}
function Layout ({ children }: { children: React.ReactNode }) {
  return <div className='flex-1'>{children}</div>
}

export default Layout
