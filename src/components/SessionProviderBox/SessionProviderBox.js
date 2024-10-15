'use client'
import { SessionProvider } from "next-auth/react"

const SessionProviderBox = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default SessionProviderBox