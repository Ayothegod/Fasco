import { Copyright } from "lucide-react";
import IsAuthPage from "../utils/IsAuthPage";
import { navLink, noUserNavLink } from "../../lib/database";
import { stateStore } from "~/lib/store";

export default function Footer({ user }: any) {
  const year = new Date().getFullYear();

  return (
    <IsAuthPage className="">
      <footer className="pageStyle pb-6">
        <div className=" flex flex-col md:flex-row  justify-between ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide">
            FASCO
          </h1>
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-4 md:mt-0">
            {user ? (
              navLink.map((link, idx) => (
                <a href={link.href} key={idx}>
                  <p className="text-sm md:text-base">{link.name}</p>
                </a>
              ))
            ) : (
              <div className="contents">
                {noUserNavLink.map((data, idx) => (
                  <a href={data.href} key={idx}>
                    <p className="text-sm md:text-base">{data.name}</p>
                  </a>
                ))}
              </div>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-center text-sm text-neutral-600 mt-6">
          Copyright <Copyright className="h-4 w-4" /> {year}. All Rights
          Reserved.
        </div>
      </footer>
    </IsAuthPage>
  );
}
