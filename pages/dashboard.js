import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default function Dashboard() {
  const { user, isLoading } = useUser();

  return (
    <div className="w-full max-w-3xl px-8 py-16 mx-auto">
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      {!isLoading && (
        <p>
          {user?.is_subscribed
            ? `Subscribed: ${user.interval}`
            : "Not Subscribed"}
        </p>
      )}
    </div>
  );
}
