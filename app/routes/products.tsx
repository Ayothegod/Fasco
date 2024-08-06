import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = "Ayomide";
    return json({ user });
  } catch (error) {
    return json({ error: "An error occured!" });
  }
}

export default function ProductsLayout() {
  // const data = useLoaderData()
  
  return (
    <div className="pageStyle">
      <Outlet />
    </div>
  );
}
