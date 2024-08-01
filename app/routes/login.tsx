import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import bannerImage from "~/assets/fascoAsset/Rectangle 19280.png";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { loginSchema } from "../lib/schema";
import LogOut from "../components/utils/LogOut";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  getSession,
  commitSession,
  destroySession,
} from "~/services/session.server";
import { requireUser } from "~/lib/actions/authActions";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  console.log(user);

  if (user) {
    return redirect("/");
  }

  return json({ msg: "hello" });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = await formData.get("intent");
  const session = await getSession(request);

  if (intent === "login") {
    const submission = parseWithZod(formData, {
      schema: loginSchema,
    });
    if (submission.status !== "success") {
      return submission.reply();
    }

    session.set("user", submission.value.email);
    // session.flash("data", { user: true, email: submission.value.email });

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (intent === "logout") {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  console.log("no intent found");
  return json({ msg: "hello" });
}

export default function LoginRoute() {
  const lastResult: any = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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

          <Form method="post" className="space-y-4">
            <div>
              <Input placeholder="Email Address" name="email" />
              {fields.email.errors ? (
                <p className="text-xs text-red-500">{fields.email.errors}</p>
              ) : null}
            </div>

            <div>
              <Input placeholder="Password" name="password" />
              {fields.password.errors ? (
                <p className="text-xs text-red-500">{fields.password.errors}</p>
              ) : null}
            </div>

            <Button name="intent" value="login" className="w-full" size="sm">
              Log in
            </Button>
          </Form>

          <Link
            to="/terms"
            className="mt-10 md:mt-auto text-xs text-blue-500 hover:text-blue-600 font-light text-right"
          >
            Fasco Terms and Conditions
          </Link>

          <div>
            <span className="text-xs">
              Already have an account?{" "}
              <Link to="/register" className="underline">
                register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
