import { Link } from "@remix-run/react";
import { stateStore } from "~/lib/store";

export function IsLoggedIn({ children }: any) {
  const user = stateStore((state: any) => state.isUser);

  return (
    <Link to={`${user ? "/shop" : "/login"}`}>{children}</Link>
  )
}
