import { useLocation } from "@remix-run/react";


export default function IsAuthPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>{path !== "/login" && path !== "/register" ? <>{children}</> : null}</>
  );
}
