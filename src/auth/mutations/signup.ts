import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../validations"
import { stripe } from "../../../integrations/stripe"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password, fullName }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  const customerData: { metadata: { appUserId: number }; email: string } = {
    metadata: {
      appUserId: user.id,
    },
    email: user.email,
  }
  const customer = await stripe.customers.create(customerData)
  const organization = await db.organization.create({
    data: {
      name: "",
      stripeCustomerId: customer.id,
      memberships: {
        create: {
          role: "OWNER",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    },
  })

  const backendUrl = process.env.API_URL + "/api/cofounder/add_user/"

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      email,
      name: fullName,
    }),
  })
  const result: { user_id: number; session_id: string } = await response.json()

  await db.user.update({
    where: { id: user.id },
    data: {
      userId: result.user_id,
    },
  })
  await db.organization.update({
    where: { id: organization.id },
    data: {
      currentSession: result.session_id,
    },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role, orgId: organization.id })
  return user
})
