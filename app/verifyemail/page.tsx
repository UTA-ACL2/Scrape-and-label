"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Page(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async()=>{
        console.log("verifyEmail function called with token:", token)
        try{

            const response = await fetch(`/api/verifyemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    verificationToken : token,

                    
                }),
            });
            console.log("Response from API:", response);
            if (response.ok) {
                const data = await response.json();
                console.log("Response data:", data);
                setVerified(true);
            } else {
                const errorData = await response.json();
                console.error("Error data:", errorData);
                setError(true);
            }
        }
        catch(error:any){
            setError(true)
            console.log(error)
        }
   
    }

    useEffect(() => {
        console.log("Extracting token from URL");
        const urlToken = new URLSearchParams(window.location.search).get('token');
        if (urlToken) {
            console.log("Token found in URL:", urlToken);
            setToken(urlToken || "");
        } else {
            console.log("No token found in URL");
        }
    },[])

    useEffect(()=>{
        //console.log()
        if(token.length>0){
            console.log("Token is set, calling verifyEmail"); 
            verifyEmail()
        }
        //verifyEmail()
    },[token])


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-2xl font-bold text-center">Verification Status</h1>
                {verified ? (
                    <p>Email verified successfully!</p>
                ) : error ? (
                    <p>Error verifying email. Please try again.</p>
                ) : (
                    <p>Verifying...</p>
                )}
            </div>
        </div>
    );
}