import type { ReactElement } from "react";
import { Xicon } from "../../icons/Twittericon";

interface Xprops{
    "text" : string;
    "logo" : ReactElement;
}
const textStyles = "text-lg"

export function Sidebaritem({ text,logo }: Xprops){
    return <div>
        <div className="flex items-center p-2 pl-8">
            {logo}
            <span className={`${textStyles} pl-2`}>
                {text}
            </span>
        </div>
    </div>
}