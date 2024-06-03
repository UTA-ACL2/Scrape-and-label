"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LoginButton({ session, loading }: { session: any, loading: boolean }) {
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>; // Replace this with your loading state
    }

    if (session) {
        return (
                <button onClick={() => signOut()}>Sign out</button>
        )
    }
    return (
            <button onClick={() => router.push('/webapps/anivoice/login')}>Sign in</button>
    )
}