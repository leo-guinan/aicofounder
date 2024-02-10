import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  MutableRefObject,
  useContext,
} from "react"

import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"

interface ChatNotepadProps {
  client: MutableRefObject<W3CWebSocket | null>
  sessionId: string
}
const ChatNotepad: React.FC<ChatNotepadProps> = ({ client, sessionId }: ChatNotepadProps) => {
  const currentUser = useCurrentUser()

  const [notes, setNotes] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState<string>("")

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentNote(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the form from refreshing the page
    if (!currentNote.trim()) return // Ignore empty submissions
    client.current?.send(
      JSON.stringify({
        message: currentNote,
        user_id: currentUser?.userId,
        chat_type: "default",
      })
    )
    setNotes([...notes, currentNote])
    setCurrentNote("") // Reset input field after submission
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Note List */}
      <ul className="flex-1 overflow-auto p-4">
        {notes.map((note, index) => (
          <li key={index} className="list-disc ml-4 my-2">
            {note}
          </li>
        ))}
      </ul>
      {/* Input Field */}
      <div className="p-4 bg-gray-100 sticky bottom-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={currentNote}
            onChange={handleNoteChange}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type your note here..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatNotepad
