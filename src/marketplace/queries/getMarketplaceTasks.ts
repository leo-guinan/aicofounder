import { Ctx } from "blitz"
import db from "../../../db"

export default async function getMarketplaceTasks({}, ctx: Ctx) {
  const backendUrl = process.env.API_URL + "/api/cofounder/marketplace/"

  const results = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({}),
  })
  const jsonResults = await results.json()
  console.log("taskResults", jsonResults)
  return jsonResults.tasks
}
