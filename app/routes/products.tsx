import { Outlet } from "@remix-run/react";

export default function ProductsLayout() {
  return (
    <div className="pageStyle">
        <Outlet/>
    </div>
  )
}
