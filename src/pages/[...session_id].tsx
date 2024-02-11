import React, { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Dashboard from "../dashboard/components/Dashboard"

let socket

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const ChatSession: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Dashboard />
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
