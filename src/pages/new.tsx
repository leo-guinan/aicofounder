import React, { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import StartSession from "../chat/components/StartSession"

const NewChatPage: BlitzPage = () => {
  return (
    <Layout title="New Chat">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <StartSession />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

NewChatPage.authenticate = {
  redirectTo: "/login",
}
export default NewChatPage
