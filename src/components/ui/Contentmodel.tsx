import { useRef } from "react";
import { Closeicon } from "../../icons/Closeicon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../Pages/Config";
import axios from "axios";

interface Popupprops{
    open: boolean;
    onclose: () => void;
    onsubmit: (data: { title: string; link: string }) => void;

}

export function Popup({open,onclose,onsubmit}: Popupprops){

    const titleref = useRef<HTMLInputElement>(null)
    const linkref = useRef<HTMLInputElement>(null)

    async function handleSubmit(){
        const title = titleref.current!.value;
        const link = linkref.current!.value;
        const token = localStorage.getItem("token")

        await axios.post(BACKEND_URL + "/api/v1/content",{
            title,
            link
        },{
            headers:{
                Autherization:token
            }
        })
        onsubmit({title,link});
        onclose()   
    }

    return(
        <>
        {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-200 z-50 ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
                    <div className="flex justify-end cursor-pointer" onClick={onclose}>
                        <Closeicon />
                    </div>
                <div className="flex flex-col gap-4 mb-4">
                    <Input 
                     placeholder="enter the title" ref={titleref}/>
                    
                    <Input 
                     placeholder="enter the Link" ref={linkref}/>                
                </div>
                    <div className="flex justify-center w-full cursor-pointer ">
                        <Button varient="primary" text='Submit'onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
