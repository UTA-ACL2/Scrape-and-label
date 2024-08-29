
import {FC, ReactNode} from 'react'
import { signIn } from "next-auth/react"

interface GoogleSignInButtonProps{
    children: ReactNode
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
  const loginWithGoogle = () => signIn("google", {callbackUrl: 'http://localhost:3000/'})

    return(
        <button onClick={loginWithGoogle} className='w-full'>
            {children}
        </button>
    )
}

export default GoogleSignInButton

