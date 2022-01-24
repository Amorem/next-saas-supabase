import initStripe from "stripe";
import { buffer } from "micro";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log("Error", error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log("event", event);

  res.send({ received: true });
}
