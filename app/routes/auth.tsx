import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     const user = "Ayomide";
//     return json({ user });
//   } catch (error) {
//     return json({ error: "An error occured!" });
//   }
// }

export default function Auth() {

  return (
    <div>
      <Outlet />
    </div>
  );
}
