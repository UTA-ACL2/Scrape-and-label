'use client'
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from '../login/login-btn';
import { useRouter,usePathname } from "next/navigation";
import Link from 'next/link';
import path from "path";


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // const connectToDatabase = async () => {
  //   try {
  //       let response = await fetch('/api/connect');
  //       return true;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // useEffect(() => {
  //   const connect = async () => {
  //     await connectToDatabase();
  //   };
  //   connect();

  // }, [])

  useEffect(() => {
    const connect = async () => {
      if (!loading && !session) {
          router.push("/login");
      }
  };
    connect();
  }, [session, loading]);

  


  return (

    <div>

    {!session && (pathname === '/login' || loading) && (
       <div
       className="flex justify-between items-center text-xl font-bold py-4 bg-blue-500 text-white">
       <div className='ml-1'>AniVoice</div>
       <div>Login Page</div>
       <div></div>
     </div>
    )}

    {!(pathname === '/login' || loading) && session && (
  <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
  <div className="flex items-center space-x-2">
    <span className="text-lg font-bold ">Welcome,</span>
    <span className="text-lg font-bold text-gray-900">{session.user?.name || ""}</span>
    <span className="text-sm font-light text-white-500">({session.user?.role})</span>
  </div>
    <Link href="/">
        <span className="text-lg font-bold">AniVoice</span>
      </Link>
    {session.user?.role === 'usurper' || session.user?.role === 'admin' ? (
      <>
      <Link href="/admin/register">
        <span className="text-lg">Add Accounts</span>
      </Link>
        <Link href="/admin/scrape">
        <span className="text-lg">Scrape</span>
      </Link>
      </>
    ) : null}
    <div>
      <LoginButton session={session} loading={loading}/>
    </div>
  </div>
)}
    </div>

  );
};

export default Navbar;