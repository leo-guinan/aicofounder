import { Ctx } from "blitz"
import db from "db"

export default async function getPreferences(_ = null, { session }: Ctx) {
  if (!session.userId) return null
  const user = await db.user.findFirst({
    where: { id: session.userId },
  })
  if (!user) {
    throw new Error("No user")
  }
  const backendUrl = process.env.API_URL + "/api/cofounder/preferences/" + user.userId + "/"

  const response = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
  })

  const result = await response.json()
  console.log(result)

  return result["preferences"] || { daily_checkin: false }
}
