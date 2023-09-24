import { resolver } from "@blitzjs/rpc"
import { SendMessage, SetBusinessProfile } from "../../auth/validations"
import { Ctx } from "blitz"
import db from "../../../db"

export default resolver.pipe(
  resolver.zod(SetBusinessProfile),
  async (
    { founderName, founderProfile, businessName, businessProfile, businessWebsite },
    ctx: Ctx
  ) => {
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

    const backendUrl = process.env.API_URL + "/api/cofounder/set_profile/"

    const results = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        founder_name: founderName,
        founder_profile: founderProfile,
        business_name: businessName,
        business_profile: businessProfile,
        business_website: businessWebsite,
        user_id: user.userId,
      }),
    })
    return results.json()
  }
)
