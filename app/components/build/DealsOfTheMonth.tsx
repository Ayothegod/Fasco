import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { imageCarouselArray } from "../../lib/database";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import DealsCountdown from "./DealsCountdown";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";

export default function DealsOfTheMonth() {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
    <div className="pageStyle mt-8 mb-16 flex flex-col md:flex-row gap-8">
      {/*  */}
      <div className="w-full md:w-[40%] flex flex-col space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
          Deals Of The Month
        </h2>
        <p className="text-sm text-neutral-600 leading-6 tracking-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
          corrupti repellat fugit corporis fugiat ab repellendus modi incidunt
          nulla at.
        </p>
        <Link to="/shop">
          <Button className="w-full sm:w-fit sm:px-8">Buy Now</Button>
        </Link>

        <div className="">
          <h4 className="font-medium text-lg text-neutral-600 mt-4">
            Hurry, Before it's Too Late!
          </h4>
          <DealsCountdown />
        </div>
      </div>

      <div className="flex items-center justify-center md:w-[60%]">
        <Carousel
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {imageCarouselArray.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="">
                  <img
                    src={_.src}
                    alt={_.alt}
                    className="w-full object-cover h-96 object-top"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
}
