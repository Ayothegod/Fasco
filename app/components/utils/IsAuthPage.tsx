import { useLocation } from "@remix-run/react";

export default function IsAuthPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path !== "/login" &&
      path !== "/register" &&
      path !== "/auth/forget-password" &&
      path !== "/auth/confirm-otp" &&
      path !== "/auth/change-password" ? (
        <div className={`${className}`}>{children}</div>
      ) : null}
    </>
  );
}
