'use client'
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from '../login/login-btn';
import { useRouter,usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
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
          <div className="text-lg">Welcome {session.user?.name || ""}</div>
          <div className="text-xl font-bold">AniVoice</div>
          <div>
            <LoginButton session={session} loading={loading}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;