import { Logo } from "../../icons/Logo";
import { Xicon } from "../../icons/Twittericon";
import { Yotubeicon } from "../../icons/Yotubeicon";
import { Sidebaritem } from "./Sidebaritem";

export function Sidebar(){
    return <div className="bg-white w-72 border-r border-gray-200 h-screen absolute left-0 top-0">
        <div>
            <h1 className="flex items-center text-2xl font-medium pl-6 pt-3 cursor-pointer">
                <div className="pr-2">
                    <Logo />
                </div>
                Brainly
            </h1>
        </div>
        <div className="pt-4 cursor-pointer">
            <div className=" hover:bg-gray-200 pl-4 transition-all">
                 <Sidebaritem text='twitter' logo={<Xicon />}/>
            </div>
            <div className=" hover:bg-gray-200 pl-4 transition-all">
                <Sidebaritem text="yotube" logo={<Yotubeicon />}/>
            </div>
             
        </div>
       
    </div>
}