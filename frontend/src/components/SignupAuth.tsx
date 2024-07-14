import { ChangeEvent, useState } from "react"
import { SignupInput } from "100xsani2-medium-common"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SignupAuth=()=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    return <div>
        <div className="flex justify-center flex-col h-screen ">
            <div className="text-center text-4xl font-bold">
                Create an account
            </div>
            
            <div className="text-center mt-2 mb-5 text-slate-500">
                Already have an account?<a className="ml-2 underline" href="/signin">Login</a>
            </div>
            
            <div className="flex justify-center">
                <div className="max-w-md w-full my-2">
                <LabelledInput id="email" label="Email" placeholder="example: JohnDoe@gmail.com" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        email:e.target.value
                    }))
                }}/>
                <LabelledInput id="name"  label="Name" placeholder="example: Sanidhya Sharma" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        name:e.target.value
                    }))
                }}/>
                <LabelledInput id="password" label="Password" placeholder="******" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        password:e.target.value
                    }))
                }} type="password"/>
                <button type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={sendRequest}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label:string,
    placeholder:string,
    type?: string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    id:string
}



function LabelledInput({ label, placeholder, onChange, type,id }: LabelledInputType) {
    return <div>
        <label className="block mb-2  text-black font-semibold pt-4 text-md">{label}</label>
        <input onChange={onChange} type={type || "text"} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}