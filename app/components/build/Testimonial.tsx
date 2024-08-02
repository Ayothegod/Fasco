import femaleSvg from "~/assets/fascoAsset/image 3.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "@remix-run/react";
import { Button } from "../ui/button";
import { testimonies } from "~/lib/database";
import { Star } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="bg-neutral-100 py-8 mt-8 mb-16 ">
      <div className="pageStyle px-2">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
            What Our Customers Say
          </h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>

        <div className="flex items-center justify-center px-12 mt-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-l"
          >
            <CarouselContent className="px-4">
              {testimonies.map((data, index) => (
                <CarouselItem key={index} className="lg:basis-1/2 ">
                  <div className="shadow m-1 rounded-md ">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden h-96 sm:h-60">
                      <img
                        src={data.image}
                        alt="Female image"
                        className="h-1/2 sm:h-full w-full sm:w-[50%] object-cover object-top bg-gray-300 rounded-t-md sm:rounded-l-md sm:rounded-t-none"
                      />
                      <div className="p-2 sm:w-[50%] h-full flex flex-col">
                        <p className="text-sm text-neutral-800">
                          {data.content}
                        </p>
                        <div className="mt-auto flex flex-col gap-2 items-start justify-end h-full">
                          <div className="font-bold text-sm flex items-center gap-2 text-red-600">
                            {data.ratings} <Star className="h-5 w-5 "/>
                          </div>
                          <h2 className="font-bold text-lg leading-4">
                            {data.name}
                          </h2>
                          <p className="text-xs">{data.occupation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <Link to="/review" className="mt-4 flex items-center justify-center">
          <Button>Write a review</Button>
        </Link>
      </div>
    </section>
  );
}
