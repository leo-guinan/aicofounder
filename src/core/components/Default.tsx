import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Default = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    if (currentUser && currentUser?.memberships[0]?.organization.currentSession) {
      void router.push(`/${currentUser.memberships[0]?.organization.currentSession}`)
    }
  }, [router])
  return (
    <>
      {!currentUser && (
        <>
          {/*login or signup buttons*/}
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold">My AI Co-founder</h1>
            <p className="text-xl">Login or Signup to chat with your co-founder!</p>
            <div className="flex gap-4 mt-4">
              <a
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Signup
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Default
