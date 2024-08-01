import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/build/Header";
import Footer from "./components/build/Footer";
import { stateStore } from "~/lib/store";
import { Lucia } from "lucia";

export function Layout({ children }: { children: React.ReactNode }) {
  const isUser = stateStore((state: any) => state.isUser);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter">
        <Header user={isUser} />
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
