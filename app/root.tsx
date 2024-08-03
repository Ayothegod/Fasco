import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/build/Header";
import Footer from "./components/build/Footer";
import { stateStore } from "~/lib/store";
import { Lucia } from "lucia";
import { Toaster } from "./components/ui/toaster";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = stateStore();
  // const data = useRouteLoaderData("index");
  // console.log(data);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter">
        <Header user={user} />
        <Toaster />
        <div className="mb-20">{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
