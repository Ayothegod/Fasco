import { followUsImages } from "../services/indexUtils";

export default function FollowUs() {
  return (
    <section className="mt-8 mb-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
          Follow Us On Instagram
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          delectus vel dolor in ex nobis sint itaque vitae, minus saepe?
        </p>
      </div>

      <div className="flex overflow-x-hidden items-center mt-10">
        {followUsImages.map((image, index) => (
          <div
            key={index}
            className={`shrink-0 w-full lg:w-1/7 md:w-1/5 sm:w-1/2 ${
              index % 2 === 0 ? "normal" : ""
            }`}
          >
            <img
              src={image.src.src}
              alt={`img-${index}`}
              className={`w-full transition-transform duration-300 object-cover object-top ${
                index % 2 === 1 ? "h-60" : "h-48"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
