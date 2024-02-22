import { resolver } from "@blitzjs/rpc"
import { MakeBid } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(MakeBid),
  async ({ taskId, bidAmount, requestedInfo }, ctx: Ctx) => {
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

    const backendUrl = process.env.API_URL + "/api/cofounder/task/bid/"

    const results = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        task_id: taskId,
        bid_amount: bidAmount,
        requested_info: requestedInfo,
      }),
    })
    console.log("bidding on task")
    const jsonResults = results.json()
    console.log("jsonResults", jsonResults)
    return jsonResults
  }
)
