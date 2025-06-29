import type { ReactElement } from "react";
import { Shareicon } from "../../icons/Shareicon";

interface Cardprops{
    "title": string;
    "starticon"? : ReactElement;
    "endIcon"? : ReactElement;
    "link" : string;
} 



export function Card({title,link,endIcon,starticon}: Cardprops){
    return(
        <div className="bg-white border-1 border-gray-500 shadow-lg p-8 w-fit flex flex-col gap-4 rounded-md justify-between">
            <div className="flex justify-between ">
                <div className="flex items-center">
                <div className="pr-2">
            {starticon}
                </div>
            {title}
            </div>
            <div className="flex items-center space-x-2">
            {endIcon}
            {<Shareicon />}
            </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 w-full max-w-xl">
                <iframe  src={link.replace("watch","embed").replace("?v=","/")} 
                title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
            </div>
        </div>
    )
}

