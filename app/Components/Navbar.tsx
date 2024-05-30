'use client'
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from '../login/login-btn';
import { useRouter,usePathname } from "next/navigation";
import Link from 'next/link';


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const connectToDatabase = async () => {
    fetch('/api/connect')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };
  useEffect(() => {
    const connect = async () => {
      if (!loading && !session) {
          router.push("/login");
      } else {
          await connectToDatabase();
      }
  };

    connect();
  }, [session, loading]);

  if (pathname === '/login' || loading) {
    return (
      <div
        className="flex justify-between items-center text-xl font-bold py-4 bg-blue-500 text-white">
        <div className='ml-1'>AniVoice</div>
        <div>Login Page</div>
        <div></div>
      </div>
    );
  }

  return (
    <div>
    {session && (
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
      <Link href="/admin/register">
        <span className="text-lg">Add Accounts</span>
      </Link>
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