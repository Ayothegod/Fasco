import femaleSvg from "~/assets/fascoAsset/image 3.svg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function Testimonial() {
  return (
    <section className="bg-neutral-100 py-8 mt-8 mb-16 ">
      <div className="pageStyle px-2">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
            This Is What Our Customers Say
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
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  {/* lg:basis-1/3 */}
                  <div className="shadow m-1 rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden">
                      <img
                        src={femaleSvg}
                        alt="Female image"
                        className="h-48 w-full sm:h-32 sm:min-w-32 lg:h-48 object-cover object-top bg-gray-300 rounded-md"
                      />
                      <div className="space-y-1 p-1">
                        <p className="text-sm sm:text-xs lg:text-sm text-neutral-800">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <span className="font-bold text-xs">Stars</span>
                        <h2 className="font-medium text-xl leading-4">
                          Jannete K.
                        </h2>
                        <p className="text-sm text-neutral-600">Entertainer</p>
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
      </div>
    </section>
  );
}
