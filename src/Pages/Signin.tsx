import { Button } from "../components/ui/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "./Config";
import { Input } from "../components/ui/Input";
import { Navigate, useNavigate } from "react-router-dom";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null)
        const passwordRef = useRef<HTMLInputElement>(null)
        const navigate = useNavigate();
        
        async function signin(){
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(BACKEND_URL+ "/api/v1/signin",{
                username,
                password
            })
            const jwt = response.data.token
            localStorage.setItem("token",jwt)
            navigate("/Dashboard")
        }

    return <div className=" fixed inset-0 flex items-center justify-center bg-slate-200 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex flex-col gap-3">
            <Input
            placeholder="enter the username" ref={usernameRef}
            />
             <Input
            placeholder="enter the password" ref={passwordRef}
            />
            </div>
            <div className="flex justify-center pt-2">
                <Button onClick={signin}text="Signin" varient="primary"/>
            </div>
        </div>
    </div>
}