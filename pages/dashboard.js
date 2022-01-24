import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";
import axios from "axios";
import { useRouter } from "next/router";

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
  const router = useRouter();

  async function loadPortal() {
    const { data } = await axios.get(`/api/portal`);
    router.push(data.url);
  }

  return (
    <div className="w-full max-w-3xl px-8 py-16 mx-auto">
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed
              ? `Subscribed: ${user.interval}`
              : "Not Subscribed"}
          </p>
          <button onClick={loadPortal}>Manage Subscription</button>
        </>
      )}
    </div>
  );
}
