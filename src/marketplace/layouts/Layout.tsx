import Head from "next/head"
import React, { Fragment, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "My AI Co-founder"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Loading...">
        <div>
          <>{children}</>
        </div>
      </Suspense>
    </>
  )
}

export default Layout
