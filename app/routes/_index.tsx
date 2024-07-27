import type { MetaFunction } from "@remix-run/node";
import { json, useRouteError } from "@remix-run/react";
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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  try {
    // const data = await client.fetch(`*[_type == "event"]`);
    return json({ data: "data" });
  } catch (error) {
    return json({ error: "An error occured!" });
  }
}

export default function Index() {
  return (
    <main className="min-h-[50vh]">
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
            <Button>Sign up</Button>
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
