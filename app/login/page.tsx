"use client";
import {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {useRouter} from 'next/navigation';
import {useSession, signIn, signOut} from "next-auth/react";
import GoogleSignInButton from '@/app/components/GoogleSignIn';
import Link from 'next/link';
import { toast } from 'react-toastify';

type LoginInput = {
    username: string;
    password: string;
}

type PageProps = {
    searchParams: {
        error?: string
    }
}

export default function Page({searchParams} : PageProps) {
    const [inputs,
        setInputs] = useState < LoginInput > ({username: "", password: ""});
    const [isLoading,
        setIsLoading] = useState(false); 
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const router = useRouter();

    useEffect(() => {
        if (!loading && session) {
            router.push("/");
        }
    }, [session, loading]);

    const handleChange = (event : ChangeEvent < HTMLInputElement >) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({
            ...values,
            [name]: value
        }))
    }

    const handleSubmit = async(event : FormEvent) => {
        event.preventDefault();
        setIsLoading(true); // Set isLoading to true when the request starts
        toast.success('Request started');
        await signIn("credentials", {
            username: inputs.username,
            password: inputs.password,
            redirect:true,
            callbackUrl: '/'
        });
        toast.success('Request ended');
        setIsLoading(false); // Set isLoading to false when the request ends
    }

    return ( 
    <> <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="on"
                            required
                            value={inputs.username || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="on"
                            required
                            value={inputs.password || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                <button
                        type="submit"
                        disabled={isLoading} // Disable the button based on isLoading
                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>
                <div className="mt-6">
                    <GoogleSignInButton>
                        Sign in with Google
                    </GoogleSignInButton>
                </div>
                {searchParams.error && (
                    <p className="text-red-600 text-center capitalize">
                        Login failed.
                    </p>
                )}
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </p>
            </form>

        </div>
    </div> </>
  )
}
