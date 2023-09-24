import { Ctx } from "blitz"
import db from "../../../db"

export default async function getBusinessProfile({}, { session }: Ctx) {
  const { userId } = session

  if (!userId) {
    throw new Error("No user ID")
  }

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  })

  if (!user) {
    throw new Error("No user")
  }

  const backendUrl = process.env.API_URL + "/api/cofounder/get_profile/"

  const results = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      user_id: user.userId,
    }),
  })

  const data = await results.json()
  console.log(data)
  return data
}
