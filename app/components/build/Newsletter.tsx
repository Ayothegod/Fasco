import maleSvg from "~/assets/fascoAsset/image 2.svg";
import femaleSvg from "~/assets/fascoAsset/image 3.svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigation,
} from "@remix-run/react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { newsletterInputSchema } from "~/lib/schema";

export default function Newsletter() {
  const { state } = useNavigation();
  const fetcher = useFetcher();
  const lastResult: any = fetcher.data;
  console.log(fetcher.data);

  const [form, fields] = useForm({
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newsletterInputSchema });
    },
  });

  return (
    <section className="py-8 mt-8 mb-16 ">
      <div className="pageStyle px-2 flex items-center justify-center lg:justify-between ">
        <img
          src={maleSvg}
          alt="male-fashion"
          className="hidden lg:block max-h-[400px]"
        />

        <fetcher.Form
          method="post"
          action="/actions"
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center max-w-[600px] p-2 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide">
              Subscribe To Our Newsletter
            </h2>
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
              delectus vel dolor in ex nobis sint itaque vitae, minus saepe?
            </p>
            <Input placeholder="michael@ymail.com" name={fields.email.name} />
            {fields.email.errors && (
              <p className="text-sm text-red-600">{fields.email.errors}</p>
            )}
          </div>
          <Button
            className="mt-6 w-full sm:w-fit sm:px-8"
            name="intent"
            value="subscribe"
            type="submit"
            disabled={fetcher.state === "submitting" || state === "loading"}
          >
            {state === "loading" ? "Loading" : "Subscribe Now"}
          </Button>
        </fetcher.Form>

        <img
          src={femaleSvg}
          alt="female-fashion"
          className="hidden lg:block max-h-[400px]"
        />
      </div>
    </section>
  );
}
