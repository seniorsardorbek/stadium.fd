import { getData } from "@/src/utils/api";
import Stadion from "../stadion";

export async function generateMetadata({ params: { postId } }: { params: { postId: string } }){
  try {
    const {data} =  await getData(`stadions/${postId}`)
    if(!data) return{
      title :"Stadion topilmadi...",
      description :"Stadion topilmadi birozdan so'ng urinib ko'ring"
    }
    return {
      title :data.destination,
      description :data.desciption,
      alternates :{
        canonical : `stadiums/${postId}`
      }, 
    }
  } catch (error) {
    return {
      title :"Stadion topilmadi...",
      description :"Stadion topilmadi birozdan so'ng urinib ko'ring"
    }
  }
 

}

export async function generateStaticParams(){
  const {data} =  await getData('stadions')
  if(!data.data) return []
  return data.data.map((post :any)=>({
    postId :post._id
  }))

}

async function Detailed ({ params: { postId } }: { params: { postId: string } }) {
 const {data} =  await getData(`stadions/${postId}`)
  return (
    <main className="flex-1 flex-wrap">
      <Stadion stadium={data}/>
    </main>
   
  )
}

export default Detailed
