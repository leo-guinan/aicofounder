import React from "react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (bid: string, details: string, email: string) => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [bid, setBid] = React.useState("")
  const [details, setDetails] = React.useState("")
  const [email, setEmail] = React.useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(bid, details, email)
    onClose() // Close modal after submit
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Task Bid Information</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              placeholder="Your Bid ($)"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              className="mt-2 px-3 py-2 border rounded shadow w-full"
            />
            <textarea
              placeholder="What additional information do you need in order to complete the task?"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-2 px-3 py-2 border rounded shadow w-full"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-3 py-2 border rounded shadow w-full"
            />
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
