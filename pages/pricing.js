import initStripe from "stripe";

export default function Pricing({ plans }) {
  return (
    <div className="flex justify-around w-full max-w-3xl py-16 mx-auto">
      {plans.map((plan) => (
        <div key={plan.id} className="h-40 px-6 py-4 rounded shadow w-80">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            ${plan.price / 100} / {plan.interval}
          </p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { data: prices } = await stripe.plans.list();
  const plans = await Promise.all(
    prices.map(async (price) => {
      // console.log("price", price);
      const product = await stripe.products.retrieve(price.product);

      return {
        id: price.id,
        name: product.name,
        price: price.amount,
        interval: price.interval,
        currency: price.currency,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans,
    },
  };
}
