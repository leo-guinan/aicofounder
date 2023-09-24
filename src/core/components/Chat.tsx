import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import getChat from "../../users/queries/getChat"

const Chat = ({
  client,
  chat,
  setChat,
  chatType,
  sessionId,
}: {
  client: any
  chat: any
  setChat: any
  chatType?: any
  sessionId: string
}) => {
  const currentUser = useCurrentUser()
  const [message, setMessage] = useState("")

  const [chatHistory] = useQuery(getChat, {
    session_id: sessionId,
  })

  // const [sendMessageMutation] = useMutation(sendMessage)

  useEffect(() => {
    if (!chatHistory) return
    console.log(chatHistory)
    setChat(chatHistory)
  }, [chatHistory])

  const handleSendMessage = async (event) => {
    event.preventDefault()
    setChat([
      ...chat,
      { message, id: Math.floor(Math.random() * 1000), source: "human" },
      { message: "...", id: -1, source: "bot" },
    ])
    setMessage("")

    client.current.send(
      JSON.stringify({
        message: message,
        user_id: currentUser?.userId,
        chat_type: chatType ?? "default",
      })
    )
    // const response = await sendMessageMutation({ message })

    // setChat([...chat, { message, id: Math.floor(Math.random() * 1000), source: "human" }, {
    //   message: "Message Received",
    //   id: Math.floor(Math.random() * 1000),
    //   source: "bot"
    // }])
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 ">
      {currentUser && (
        <>
          <div className="flex flex-col w-full min-h-screen h-full p-5 justify-between">
            <div className="flex flex-col justify-end">
              {chat.map(({ message, id, source }) => (
                <>
                  {source === "human" ? (
                    <div key={id} className="my-3 bg-gray-300 rounded p-3 text-sm w-3/4">
                      {message}
                    </div>
                  ) : (
                    <div
                      key={id}
                      className="my-3 bg-gray-700 rounded p-3 text-sm text-white  flex-row-reverse w-3/4"
                    >
                      <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                  )}
                </>
              ))}
            </div>

            <div className="flex w-3/4 flex-col">
              <form onSubmit={handleSendMessage}>
                <input
                  className="w-full h-8 rounded mb-0 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
                  value={message}
                  placeholder="Type your message here..."
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button className="hidden" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {!currentUser && (
        <>
          {/*login or signup buttons*/}
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold">My AI Co-founder</h1>
            <p className="text-xl">Login or Signup to start chatting</p>
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
    </div>
  )
}

export default Chat
