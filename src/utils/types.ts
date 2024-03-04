export interface StadiumFace {
    _id: string
  owner: Pick<OwnerFace, "name" | "callnumber">
  destination: string
  description: string
  callnumber: number
  images: string[]
  rate: number
  size: size
  cost: number
  lat: number
  lng: number
  created_at: string
  updated_at: string
}

export interface OwnerFace {
  _id: string
  name: string
  email: string
  callnumber: string
}
export interface size {
  w: string
  h: string
}
export interface BookingFace {
  bookingBy: Pick<OwnerFace, "name" | "callnumber">
  created_at: string
  updated_at: string
  from: number
  _id: string
  stadion: StadiumFace
  status: 'pending' | 'confirmed' | 'rejected'
}

export interface CommentFace {
  _id: string
  created_at: string
  updated_at: string
  comment: string
  post: string
  commentBy: UserFace
}
export interface UserFace {
  _id: string
  name: string
  phonenumber: string
}
export interface EventsFace {
  _id: string
  toMessage: string
  message: string
  created_at: string
  updated_at: string
  viewed: boolean
  eventBy: {
    _id: string
    name: string
  }
}

export interface  ResponseFace<T> {
    total ?: number
    offset?: number
    limit?: number
    data?: T[]
}