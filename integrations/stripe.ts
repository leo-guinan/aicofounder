import Stripe from "stripe"
console.log(
  "Stripe Secret Key",
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? ""
)
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? "",
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2022-11-15",
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
  }
)
