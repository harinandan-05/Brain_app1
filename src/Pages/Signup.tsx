import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "./Config";
import {data, useNavigate} from "react-router-dom";
import axios from "axios";

export function Signup(){
        const usernameRef = useRef<HTMLInputElement>(null)
        const passwordRef = useRef<HTMLInputElement>(null)
        const navigate = useNavigate();

        async function signup(){
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            await axios.post(BACKEND_URL+ "/api/v1/signup",{
                username,
                password
            })
            navigate("/signin")
        }
    
    return <div className=" fixed inset-0 flex items-center justify-center bg-slate-200 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex flex-col gap-3">
            <Input placeholder="Enter the usernanme" ref={usernameRef} 
            />
             <Input placeholder="Enter the password" ref={passwordRef}
            />
            </div>
            <div className="flex justify-center pt-2 ">
                <Button onClick={signup}text="Signup" varient="primary"/>
            </div>
        </div>
    </div>
}