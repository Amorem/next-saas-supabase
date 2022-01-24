import Link from "next/link";
import { useUser } from "../context/user";

export default function Nav() {
  const { user } = useUser();
  return (
    <nav className="flex px-6 py-4 border-b border-gray-200">
      <Link href="/">
        <a>Home</a>
      </Link>
      {!!user && (
        <Link href="/dashboard">
          <a className="ml-2">Dashboard</a>
        </Link>
      )}
      <Link href="/pricing">
        <a className="ml-2">Pricing</a>
      </Link>
      <div className="ml-auto">
        <Link href={user ? "/logout" : "/login"}>
          <a>{user ? "Logout" : "Login"}</a>
        </Link>
      </div>
    </nav>
  );
}
