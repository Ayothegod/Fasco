import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { imageCarouselArray } from "../services/indexUtils";

export default function IndexCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
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
                  src={_.src.src}
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
  );
}
