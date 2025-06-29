import type { ReactElement } from "react";

interface Buttonprops{
  'varient': "primary" | "secondary";
  'text': String;
  'starticon'?: ReactElement;
   onClick ?:() => void
}

const varientStyles = {
  "primary" : "bg-[#4F46E5] text-white font-light",
  "secondary" : "bg-red-500 text-white font-light"
}

const defaultStyles = "px-3 py-3 rounded-md flex items-center"

export function Button({varient,text,starticon,onClick}:Buttonprops) {
  return <div> <button onClick={onClick} className={varientStyles[varient] + " " + defaultStyles } >
    <div className="pr-2 ">
    {starticon}
    </div>
    {text}
  </button>
  </div>
 
}