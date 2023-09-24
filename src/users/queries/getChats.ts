import { Ctx } from "blitz"
import db from "db"

export default async function getChats(_ = null, { session }: Ctx) {
  if (!session.userId) return null
  const user = await db.user.findFirst({
    where: { id: session.userId },
  })

  if (!user) {
    throw new Error("No user")
  }

  const backendUrl = process.env.API_URL + "/api/cofounder/chats/"
  console.log(backendUrl)

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      user_id: user.userId,
    }),
  })
  const result: {
    chats: {
      name: string
      session_id: string
    }[]
  } = await response.json()

  return result.chats || []
}
