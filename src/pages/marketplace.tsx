import React, { Suspense } from "react"
import Layout from "src/marketplace/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Dashboard from "../dashboard/components/Dashboard"
import Marketplace from "../marketplace/components/Marketplace"

let socket

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const MarketplacePage: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Marketplace />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default MarketplacePage
