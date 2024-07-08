import { FC } from 'react'
import { signIn } from "next-auth/react"
import GoogleIcon from './GoogleIcon'

const GoogleSignInButton: FC = () => {
  const loginWithGoogle = () => signIn("google", { callbackUrl: 'http://localhost:3000/' })

  return (
    <button
      onClick={loginWithGoogle}
      className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <GoogleIcon className="w-5 h-5 mr-2" />
      Sign in with Google
    </button>
  )
}

export default GoogleSignInButton
