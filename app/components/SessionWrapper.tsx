// mark as client component
"use client";
import { SessionProvider } from "next-auth/react"

import React from 'react'

const SessionWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider  baseUrl={"http://redgiant.uta.edu/webapps/anivoice"} basePath={`/api/auth`}>{children}</SessionProvider>
  )
}

export default SessionWrapper