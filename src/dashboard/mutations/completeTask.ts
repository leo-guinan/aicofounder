import { resolver } from "@blitzjs/rpc"
import { CompleteTask } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "db"

export default resolver.pipe(resolver.zod(CompleteTask), async ({ taskId }, ctx: Ctx) => {
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

  const backendUrl = process.env.API_URL + "/api/cofounder/task/complete"

  const results = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      task_id: taskId,
      session_id: user.memberships[0]?.organization.currentSession,
      user_id: user.userId,
    }),
  })
  console.log("completing task")
  return results.json()
})
