import { Suspense } from "react";
import { navLink, loggedInIcons } from "../../lib/database";
import { Button } from "../ui/button";
import IsAuthPage from "../utils/IsAuthPage";
import { IsLoggedIn } from "../utils/IsLoggedIn";
import { Await } from "@remix-run/react";

export default function Header({ user }: any) {
  return (
    <>
      <header className="pageStyle flex items-center justify-between py-6">
        <IsLoggedIn>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide">
            FASCO
          </h1>
        </IsLoggedIn>

        <IsAuthPage>
          <nav className=" contents">
            <ul className="hidden md:flex items-center gap-8">
              {navLink.map((link, idx) => (
                <p key={idx} className="text-sm md:text-base">
                  {user && link.withUser && <a href={link.href}>{link.name}</a>}
                  {!user && !link.withUser && (
                    <a href={link.href}>{link.name}</a>
                  )}
                </p>
              ))}
            </ul>

            {user && (
              <div className="flex gap-4 md:gap-8">
                {loggedInIcons.map((icon, id) => (
                  <div key={id}>{user ? <icon.icon /> : null}</div>
                ))}
              </div>
            )}
          </nav>
        </IsAuthPage>
      </header>
    </>
  );
}
