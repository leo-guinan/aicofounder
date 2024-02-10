// ChatAssistant.tsx

import React, { useState } from "react"

export type Message = {
  id: string
  text: string
}

interface ChatAssistantProps {
  messages: Message[]
}
const ChatAssistant: React.FC<ChatAssistantProps> = ({ messages }: ChatAssistantProps) => {
  return (
    <div className="relative flex flex-col items-start p-4 h-[500px] bg-gray-100 rounded-lg">
      <div className="absolute top-2 left-2">
        <img
          className="h-16 w-auto rounded-full p-2"
          src="./logo.png"
          alt="Choose Your Algorithm"
        />
      </div>
      <div className="mt-12 w-full">
        {/* Chat messages */}
        <div className="flex flex-col-reverse space-y-2 space-y-reverse p-2 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg p-2 text-white max-w-xs bg-blue-500 ml-auto`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatAssistant
