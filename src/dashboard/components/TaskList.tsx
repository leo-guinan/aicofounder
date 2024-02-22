// TaskList.tsx

import React, { SyntheticEvent, useState } from "react"
import Scope from "./Scope"
import { useMutation } from "@blitzjs/rpc"
import updateScope from "../mutations/updateScope"

export type Task = {
  id: number
  name: string
  details: string
  taskFor: string
}

type TaskListProps = {
  tasks: Task[]
  setCurrentTasks: (tasks: Task[]) => void
  completeTask: (taskId: number) => Promise<void>
}

const TaskItem: React.FC<{
  task: Task
  onComplete: (event: SyntheticEvent, taskId: number) => void
}> = ({ task, onComplete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [updateScopeMutation] = useMutation(updateScope)

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSetScope = async (scope) => {
    await updateScopeMutation({
      taskId: task.id,
      scope,
    })
  }

  return (
    <div className="flex flex-col bg-white shadow overflow-hidden mb-4 rounded-lg">
      <div className="w-full bg-blue-500 text-white text-center py-4">
        <Scope setScope={handleSetScope} />
      </div>
      <div className="flex flex-1">
        <div className="flex w-3/4">
          <div className="px-4 py-2 sm:px-6 cursor-pointer" onClick={toggleOpen}>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{task.name}</h3>
            <button
              onClick={(e) => onComplete(e, task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
            >
              Complete
            </button>
          </div>
        </div>
        <div className="flex w-1/4 items-center justify-center">
          <div className="text-right w-full">
            <span className="text-2xl">+</span>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Details</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{task.details}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">For</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{task.taskFor}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setCurrentTasks, completeTask }) => {
  const handleCompleteTask = async (e: SyntheticEvent, taskId: number) => {
    e.preventDefault()
    await completeTask(taskId)
    setCurrentTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onComplete={handleCompleteTask} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
