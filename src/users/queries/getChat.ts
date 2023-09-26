import { Ctx } from "blitz"
import db from "db"

export default async function getChat(
  {
    session_id,
  }: {
    session_id: string | null | undefined
  },
  { session }: Ctx
) {
  if (!session_id || !session.userId) return null
  const user = await db.user.findFirst({
    where: { id: session.userId },
  })

  if (!user) {
    throw new Error("No user")
  }

  const backendUrl = process.env.API_URL + "/api/cofounder/chat/"

  const response = await fetch(`${backendUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      user_id: user.userId,
      session_id: session_id,
    }),
  })
  const result: {
    name: string
    session_id: string
    messages: {
      message: string
      type: string
    }[]
  } = await response.json()

  const mappedResults = result.messages.map((message) => {
    return {
      message: message.message,
      source: message.type === "human" ? "human" : "bot",
      id: Math.random().toString(36).substring(7),
    }
  })

  return mappedResults || []
}
