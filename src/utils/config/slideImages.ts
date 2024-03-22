export function slideImageConfig (images :string[]){
    return images.map((img) =>{
       return {
           src: img,
           width: 3840,
           height: 5760,

        }
    })

} 