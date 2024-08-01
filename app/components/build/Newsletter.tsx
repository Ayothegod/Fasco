import maleSvg from "~/assets/fascoAsset/image 2.svg";
import femaleSvg from "~/assets/fascoAsset/image 3.svg"
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  return (
    <section className="py-8 mt-8 mb-16 ">
      <div className="pageStyle px-2 flex items-center justify-center lg:justify-between ">
        <img
          src={maleSvg}
          alt="male-fashion"
          className="hidden lg:block max-h-[400px]"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center max-w-[600px] p-2 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide">
              Subscribe To Our Newsletter
            </h2>
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
              delectus vel dolor in ex nobis sint itaque vitae, minus saepe?
            </p>
            <Input placeholder="michael@ymail.com"/>
          </div>
          <Button className="mt-6 w-full sm:w-fit sm:px-8">Subscribe Now</Button>
        </div>
        <img
          src={femaleSvg}
          alt="female-fashion"
          className="hidden lg:block max-h-[400px]"
        />
      </div>
    </section>
  );
}

