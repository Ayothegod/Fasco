import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import bannerImage from "~/assets/fascoAsset/Rectangle 19280.png";
// import { parseWithZod } from "@conform-to/zod";
// import { useForm } from "@conform-to/react";
import { loginSchema } from "../lib/schema";
import LogOut from "../components/utils/LogOut";
import { Form, Link, useActionData } from "@remix-run/react"
import { useForm } from "react-hook-form";
// { request }: LoaderFunctionArgs

// export async function Loader() {
//   const result = await getUserDetails();
//   console.log(result);
//   return json({ msg: "hello" });
// }

// export async function Action() {
//   const formData = await request.formData();
//   const intent = await formData.get("intent");

//   if (intent === "login") {
//     const submission = parseWithZod(formData, {
//       schema: loginSchema,
//     });
//     if (submission.status !== "success") {
//       return submission.reply();
//     }
//     const result = await login(submission.payload.email as string, submission.payload.password as string);
//     return json({ msg: "User logged in" });
//   }

//   if (intent === "logout") {
//     const deleteSession = await logout();
//     return json(null);
//   }

//   console.log("no intent found");
//   return json({ msg: "hello" });
// }

export default function LoginRoute() {
  const lastResult: any = useActionData();
  // const [form, fields] = useForm({
  //   lastResult,
  //   onValidate({ formData }) {
  //     return parseWithZod(formData, { schema: loginSchema });
  //   },
  //   shouldValidate: "onBlur",
  //   shouldRevalidate: "onInput",
  // });

  return (
    <main className="pageStyle flex items-center justify-center">
      <div className="flex w-full sm:max-w-sm md:max-w-3xl border rounded-md overflow-hidden">
        <div className="md:max-w-[50%] hidden md:block">
          <img
            src={bannerImage}
            alt="banner-image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-center px-8 py-4 space-y-4">
          <h2 className="text-lg font-serif font-bold tracking-wide">
            Login to Fasco
          </h2>
          <LogOut />

          <div className="mt-2 flex flex-col md:flex-row items-center justify-center w-full gap-2">
            <Form method="post" className="contents">
              <Button
                variant="outline"
                size="sm"
                className="w-full "
                name="intent"
                value="signInWithGoogle"
              >
                sign in with Google
              </Button>
            </Form>

            <Form method="post" className="contents">
              <Button
                variant="default"
                size="sm"
                className="w-full"
                name="intent"
                value="signInWithGithub"
              >
                sign in with Github
              </Button>
            </Form>
          </div>

          <span className="text-center text-lg font-bold text-neutral-600">
            OR
          </span>
          {fields.email.errors ? <div>{fields.email.errors}</div> : null}
          <div>{fields.password.errors}</div>

          <Form method="post" className="space-y-4">
            <Input placeholder="Email Address" name="email" />
            <Input placeholder="Password" name="password" />

            <Button
              name="intent"
              value="login"
              className="w-full"
              size="sm"
            >
              Log in
            </Button>
          </Form>

          <Link
            to="/"
            className="mt-10 md:mt-auto text-xs text-blue-500 hover:text-blue-600 font-light text-right"
          >
            Fasco Terms and Conditions
          </Link>
        </div>
      </div>
    </main>
  );
}
