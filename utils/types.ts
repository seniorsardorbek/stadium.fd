export interface StadionType {
    owner: {
        name :string
        _id: string
    };

    description: string;



    callnumber: number;
    images: string[];
    rate: number
    likes: string[]
    _id: string

    created_at: string
    updated_at: string
    size: size;
    cost: number;
    lat: number;
    lng: number;
    destination: string;
}

interface size{
    w : string
    h : string
}
export interface bookingFace{
    bookingBy :{name : string}
    created_at: string
    updated_at: string
    from:number
    _id: string
    stadion: StadionType
    status : 'pending' | 'confirmed' | 'rejected'

}


export interface  CommentFace{
    _id : string
    created_at :string
    updated_at :string
    comment: string
    post:string
    commentBy :{
        _id : string
        name: string
        email:string
        avatarka:  string
    }
}
export interface userFace {
    _id : string
    name: string
    email : string
    avatarka : string
}
 export interface eventsFace{
    _id: string
    toMessage: string
    message :string
    created_at :string
    updated_at:string
    viewed: boolean
    eventBy:  {
        _id : string
        name :string
    }
 }
