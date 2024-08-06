import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/build/Header";
import Footer from "./components/build/Footer";
import { stateStore } from "~/lib/store";
import { Lucia } from "lucia";
import { Toaster } from "./components/ui/toaster";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = "Ayomide";
    return json({ user });
  } catch (error) {
    return json({ error: "An error occured!" });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data: any = useLoaderData()
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter">
        <Header user={data.user} />
        <Toaster />
        <div className="mb-20">{children}</div>
        <Footer user={data.user} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
