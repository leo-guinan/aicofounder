import React, { useState } from "react"
import Modal from "./Modal"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getMarketplaceTasks from "../queries/getMarketplaceTasks"
import makeBid from "../mutations/makeBid"

const Marketplace = () => {
  const [tasks] = useQuery(getMarketplaceTasks, {})
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null)
  const [makeBidMutation] = useMutation(makeBid)

  const handleClaimTask = (taskId: number) => {
    setCurrentTaskId(taskId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const submitBid = (bid: string, details: string, email: string) => {
    console.log(`Bid submitted for task ${currentTaskId}:`, bid, details, email)
    // Here you would handle the bid submission, e.g., update the task status in your backend
    setIsModalOpen(false)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="mb-4 px-3 py-2 border rounded shadow"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-bold">{task.name}</h3>
              <p className="text-gray-700">{task.details}</p>
              {/*use this to display market estimated price once that data is available.*/}
              {/*<div className="mt-2 mb-4 text-green-600 font-semibold">{task.taskFor}</div>*/}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleClaimTask(task.id)}
              >
                Bid
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No tasks found.</p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={submitBid} />
    </div>
  )
}

export default Marketplace
