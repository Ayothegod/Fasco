import { imageNumbers } from "../../lib/database";

imageNumbers

export default function FollowUs() {
  return (
    <section className="mt-8 mb-16 px-4">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
          Follow Us On Instagram
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          delectus vel dolor in ex nobis sint itaque vitae, minus saepe?
        </p>
      </div>

      <div className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md py-4">
        {imageNumbers.map((image, index) => (
          <img
            key={index}
            src={`https://picsum.photos/200/${index % 2 === 0 ? '200' : '300'}?random&format=png`}
            alt="image alts"
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
}
