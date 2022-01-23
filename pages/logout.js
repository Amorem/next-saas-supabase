import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push("/");
    };
    logout();
  }, []);
  return <p>Login Out</p>;
}
