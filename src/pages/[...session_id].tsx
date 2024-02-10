import React, { Suspense, useEffect, useRef, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Chat from "../core/components/Chat"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import updateChatSession from "../chat/mutations/updateChatSession"
import ChatNotepad from "../dashboard/components/ChatNotepad"
import TaskList, { Task } from "../dashboard/components/TaskList"
import ChatAssistant, { Message } from "../dashboard/components/ChatAssistant"
import { v4 as uuidv4 } from "uuid"

let socket

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const ChatSession: BlitzPage = () => {
  const client = useRef<W3CWebSocket | null>(null)
  const router = useRouter()
  console.log(router.query)
  const sessionId = router?.query?.session_id
    ? (router.query.session_id[0] as unknown as string)
    : ""
  const [answers, setAnswers] = useState<Message[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const [updateChatSessionMutation] = useMutation(updateChatSession)

  useEffect(() => {
    if (!router.isReady) return
    void updateChatSessionMutation({ sessionId })

    const connectSocket = () => {
      // client.current = new W3CWebSocket(`${sessionId}/`)
      client.current = new W3CWebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}cofounder/${sessionId}/`
      )

      client.current.onopen = () => {
        console.log("WebSocket Client Connected")
      }

      client.current.onmessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data)
        console.log(data)
        if (data.id === "answer") {
          setAnswers([
            ...answers,
            {
              id: uuidv4(),
              text: data.message,
            },
          ])
        } else if (data.id === "task") {
          const parsedMessage = JSON.parse(data.message)

          console.log(parsedMessage)
          setTasks([...tasks, ...parsedMessage])
        } else {
          console.log(data.message)
        }
      }

      client.current.onclose = (event: CloseEvent) => {
        setTimeout(() => {
          connectSocket()
        }, 5000) // retries after 5 seconds.
      }

      client.current.onerror = (error: Error) => {
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
            <div className="flex h-screen">
              {/* Chat Frame - Left Half */}
              <div className="w-1/2 bg-gray-200 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold">Chat Frame</h2>
                <ChatNotepad client={client} sessionId={sessionId} />
              </div>

              {/* Right Half - Task List and Chat Assistant */}
              <div className="w-1/2 flex flex-col">
                {/* Task List - Top */}
                <div className="flex-1 bg-blue-200 p-4 overflow-y-auto">
                  <h2 className="text-lg font-semibold">Task List</h2>
                  <TaskList tasks={tasks} />
                </div>

                {/* Chat Assistant - Bottom */}
                <div className="flex-1 bg-green-200 p-4 overflow-y-auto">
                  <h2 className="text-lg font-semibold">Chat Assistant</h2>
                  <ChatAssistant messages={answers} />
                </div>
              </div>
            </div>
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
