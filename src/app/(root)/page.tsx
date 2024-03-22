import  Hero  from "@/src/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Bosh sahifa'
}
export default function Home() {
  return (
    <main className=' ' >
      <Hero/>
      {/* <Sponsors/> */}

    </main>
  )
}
