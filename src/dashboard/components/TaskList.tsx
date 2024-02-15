// TaskList.tsx

import React, { SyntheticEvent, useState } from "react"

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

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="bg-white shadow overflow-hidden mb-4 rounded-lg">
      <div className="px-4 py-5 sm:px-6 cursor-pointer" onClick={toggleOpen}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">{task.name}</h3>
        <button
          onClick={(e) => onComplete(e, task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
        >
          Complete
        </button>
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
