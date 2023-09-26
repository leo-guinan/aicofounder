import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import startChatSession from "../mutations/startChatSession"
import { useEffect, useState } from "react"

const StartSession = () => {
  const router = useRouter()
  const [startChatSessionMutation] = useMutation(startChatSession)
  const [sessionId, setSessionId] = useState("")

  const createSession = async () => {
    try {
      const response = await startChatSessionMutation({})
      const sessionId = response.session_id
      setSessionId(sessionId)
    } catch (error) {
      setSessionId("error")
    }
  }

  useEffect(() => {
    void createSession()
  }, [])

  useEffect(() => {
    if (sessionId === "") return
    void router.push(`/${sessionId}`)
  }, [sessionId, router])

  return <div className="flex flex-col h-screen justify-center items-center">Loading...</div>
}

export default StartSession
