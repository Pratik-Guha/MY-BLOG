import Image from "next/image";

type Props={
    src:string,
    alt:string,
    // width:number
    // height:number
    priority?:string,
}


export default function CustomImage({src,alt,priority}:Props) {

    const prty=priority?true:false
    return (
        <div className="w-full h-full">
            <Image
                className="rounled-lg mx-auto" 
                src={src}
                alt={alt}
                priority={prty}
                width={650}
                height={650}
            />
        </div>
    )
}    