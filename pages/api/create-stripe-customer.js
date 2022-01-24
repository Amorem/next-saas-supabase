import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import initStripe from "stripe";
import { getServiceSupabase } from "../../utils/supabase";

export default async function handler(req, res) {
  //   console.log("called", req.query, process.env.API_ROUTE_SECRET);
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET.toString()) {
    console.log("Not authorized");
    return res.status(401).send("Unauthorized");
  }
  //   console.log("I passed API KEY auth check");
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  const supabase = getServiceSupabase();

  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);

  res.send({ message: `Stripe customer created: ${customer.id}` });
}
