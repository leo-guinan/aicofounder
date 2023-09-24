import { useEffect, useState } from "react"
import setBusinessProfile from "../mutations/setBusinessProfile"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getBusinessProfile from "../queries/getBusinessProfile"

const BusinessProfile = () => {
  const [businessProfile] = useQuery(getBusinessProfile, {})

  const [updateProfileMutation] = useMutation(setBusinessProfile)
  const [businessName, setBusinessName] = useState("")
  const [founderName, setFounderName] = useState("")
  const [aboutFounder, setAboutFounder] = useState("")
  const [aboutBusiness, setAboutBusiness] = useState("")
  const [website, setWebsite] = useState("")

  useEffect(() => {
    if (businessProfile) {
      setBusinessName(businessProfile.business_name ?? "")
      setFounderName(businessProfile.founder_name ?? "")
      setAboutFounder(businessProfile.founder_profile ?? "")
      setAboutBusiness(businessProfile.business_profile ?? "")
      setWebsite(businessProfile.business_website ?? "")
    }
  }, [businessProfile])

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    await updateProfileMutation({
      businessName,
      founderName,
      founderProfile: aboutFounder,
      businessProfile: aboutBusiness,
      businessWebsite: website,
    })
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSaveProfile}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">Your Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              The more information you share, the better your co-founder will be able to help you.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="founder-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Your Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <input
                      type="text"
                      name="founder-name"
                      id="founder-name"
                      value={founderName}
                      autoComplete="founder-name"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Firstname Lastname"
                      onChange={(e) => setFounderName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about-founder"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  About You
                </label>
                <div className="mt-2">
                  <textarea
                    id="about-founder"
                    name="about-founder"
                    value={aboutFounder}
                    rows={3}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onChange={(e) => setAboutFounder(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Write a few sentences about yourself. Your skills, your background, etc. Things
                  you would want your co-founder to know about you.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">Business Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Tell us a little bit about your business.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="business-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Business Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      value={businessName}
                      autoComplete="business-name"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Acme"
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="business-website"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Business Website
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <input
                      type="text"
                      name="business-webiste"
                      id="business-website"
                      value={website}
                      autoComplete="business-website"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="acme.com"
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about-business"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  About Your Business
                </label>
                <div className="mt-2">
                  <textarea
                    id="about-business"
                    name="about-business"
                    rows={3}
                    value={aboutBusiness}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onChange={(e) => setAboutBusiness(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Write a few sentences about your business, where you are with the business, and
                  anything your co-founder should know.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default BusinessProfile
