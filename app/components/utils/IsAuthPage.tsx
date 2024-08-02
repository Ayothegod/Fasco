import { useLocation } from "@remix-run/react";

export default function IsAuthPage({
  children, className
}: {
  children: React.ReactNode;
  className: string
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path !== "/login" && path !== "/register" ? <div className={`${className}`}>{children}</div> : null}
    </>
  );
}
