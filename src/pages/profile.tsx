import React, { Suspense } from "react"
import Layout from "../core/layouts/Layout"
import BusinessProfile from "../profile/components/BusinessProfile"

const BusinessProfilePage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <BusinessProfile />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}
BusinessProfilePage.authenticate = {
  redirectTo: "/login",
}

export default BusinessProfilePage
