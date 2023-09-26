import React, { Suspense, useEffect, useRef, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Chat from "../core/components/Chat"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import updateChatSession from "../chat/mutations/updateChatSession"

let socket

type Message = {
  source: "human" | "bot"
  message: string
  id: number
}

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const ChatSession: BlitzPage = () => {
  const client = useRef<W3CWebSocket>(null)
  const router = useRouter()
  console.log(router.query)
  const sessionId = router?.query?.session_id
    ? (router.query.session_id[0] as unknown as string)
    : ""
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<Message>({ message: "", source: "human", id: 0 })

  const [updateChatSessionMutation] = useMutation(updateChatSession)

  useEffect(() => {
    if (newMessage.message === "") return
    setChat((c) => [
      ...c.filter((value) => value.id !== -1),
      {
        ...newMessage,
      },
    ])
    setNewMessage({ message: "", source: "human", id: 0 })
  }, [newMessage])

  useEffect(() => {
    if (!router.isReady) return
    setChat([])
    void updateChatSessionMutation({ sessionId })

    const connectSocket = () => {
      // client.current = new W3CWebSocket(`${sessionId}/`)
      client.current = new W3CWebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}cofounder/${sessionId}/`
      )

      client.current.onopen = () => {
        console.log("WebSocket Client Connected")
        setChat([])
      }

      client.current.onmessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data)
        setNewMessage({ message: data.message, source: "bot", id: data.id })
      }

      client.current.onclose = (event: CloseEvent) => {
        setChat([])
        setTimeout(() => {
          connectSocket()
        }, 5000) // retries after 5 seconds.
      }

      client.current.onerror = (error: ErrorEvent) => {
        console.log(`WebSocket Error: ${error.message}`)
      }
    }

    void updateChatSessionMutation({ sessionId })
    connectSocket()
  }, [router, sessionId])

  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Chat client={client} chat={chat} setChat={setChat} sessionId={sessionId} />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

ChatSession.authenticate = {
  redirectTo: "/login",
}
export default ChatSession
