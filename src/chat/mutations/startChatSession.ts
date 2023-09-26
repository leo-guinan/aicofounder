import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import db from "db"

type Response = { session_id: string }

export default resolver.pipe(async ({}, ctx: Ctx): Promise<Response> => {
  const { userId } = ctx.session

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
  const backendUrl = process.env.API_URL + "/api/cofounder/start_chat/"

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
  return results.json()
})
