import initStripe from "stripe";
import { supabase } from "../../utils/supabase";

export default async function handler(req, res) {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const customer = stripe.customers.create({
    email: req.body.record.email,
  });
  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);
  res.send({ message: `Stripe customer created: ${customer.id}` });
}
