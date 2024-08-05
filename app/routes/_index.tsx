import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  json,
  Link,
  redirect,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import DealsOfTheMonth from "~/components/build/DealsOfTheMonth";
import FollowUs from "~/components/build/FollowUs";
import NewArrivals from "~/components/build/NewArrivals";
import Newsletter from "~/components/build/Newsletter";
import Testimonial from "~/components/build/Testimonial";
import { Button } from "~/components/ui/button";
import bottomBanner from "~/assets/fascoAsset/image (1).png";
import {
  default as leftBanner,
  default as rightBanner,
} from "~/assets/fascoAsset/image 227.png";
import topBanner from "~/assets/fascoAsset/image.png";
import pradaLogo from "~/assets/fascoAsset/logo (1).png";
import louisVuittonLogo from "~/assets/fascoAsset/logo (2).png";
import chanelLogo from "~/assets/fascoAsset/logo (3).png";
import calvinKleinLogo from "~/assets/fascoAsset/logo.png";
import slider from "~/assets/fascoAsset/slider.png";
import { requireUser } from "~/lib/actions/authActions";
import LogOut from "~/components/utils/LogOut";
import { commitSession } from "~/services/session.server";
import { useEffect, useState } from "react";
import { getDataLinkHrefs } from "@remix-run/react/dist/links";
import { stateStore } from "~/lib/store";
import { useToast } from "~/components/ui/use-toast";

export const handle = { id: "routes/index" };

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const user = await requireUser(request);
    // console.log(user);
    return json(
      { user: user?.user, data: user?.data },
      {
        headers: {
          "Set-Cookie": await commitSession(user?.session),
        },
      }
    );
  } catch (error) {
    return json({ error: "An error occured!" });
  }
}

export default function Index() {
  const { toast } = useToast();
  const data: any = useLoaderData<typeof loader>();

  useEffect(() => {
    if (data.data === "OLD_USER") {
      toast({
        description: "Welcome back",
      });
    }
    if (data.data === "NEW_USER") {
      toast({
        description: "Welcome to fasco, new user",
      });
    }
  }, []);

  return (
    <main className="min-h-[50vh]">
      <LogOut />

      <section className="pageStyle grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="hidden md:block w-full h-[400px] md:h-[500px] bg-gray-300 rounded-md">
          <img
            src={leftBanner}
            alt="top-banner-image"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="w-full min-h-[80vh] md:h-[500px] bg-white rounded-md flex flex-col">
          <div className="h-[20%] bg-gray-300 rounded-md">
            <img
              src={topBanner}
              alt="top-banner-image"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="h-[60%] p-4 border text-center flex flex-col items-center justify-center gap-4">
            <h2 className="text-7xl md:text-4xl font-bold">ULTIMATE</h2>
            <h2 className="text-8xl md:text-7xl font-bold">SALE</h2>
            <p>NEW COLLECTION</p>
            <Link to="/shop">
              <Button>Get started</Button>
            </Link>
          </div>

          <div className="h-[20%] bg-pink-300 rounded-md ">
            <img
              src={bottomBanner}
              alt="bottom-banner-image"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div className="hidden md:block w-full h-[400px] md:h-[500px] bg-gray-300 rounded-md">
          <img
            src={rightBanner}
            alt="top-banner-image"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </section>

      {/* brands */}
      <section className="pageStyle mt-16 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
          Sponsors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:flex-wrap md:items-center md:justify-between mt-6">
          <img
            src={chanelLogo}
            alt="top-banner-image"
            className="w-24 md:w-36"
          />
          <img
            src={louisVuittonLogo}
            alt="top-banner-image"
            className="w-24 md:w-36"
          />
          <img
            src={pradaLogo}
            alt="top-banner-image"
            className="w-24 md:w-36"
          />
          <img
            src={calvinKleinLogo}
            alt="top-banner-image"
            className="w-24 md:w-36"
          />
        </div>
      </section>

      {/* deals */}
      <DealsOfTheMonth />

      {/* New Arrivals */}
      <NewArrivals />

      <section className="hidden md:block mt-16 mb-16">
        <img src={slider} alt="top-banner-image" className="" />
      </section>

      {/* Follow us on instagram */}
      <FollowUs />

      {/* Testimonial */}
      <Testimonial />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}

export function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
