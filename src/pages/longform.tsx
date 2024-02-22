import React, { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Tiptap from "../core/components/Tiptap"

const LongformPage: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl h-max">
          <Suspense fallback="Loading...">
            <Tiptap />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

LongformPage.authenticate = {
  redirectTo: "/login",
}
export default LongformPage
