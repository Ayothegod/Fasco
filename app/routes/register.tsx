import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, json, Link, redirect, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import LogOut from "../components/utils/LogOut";
import bannerImage from "~/assets/fascoAsset/Rectangle 19280 (1).png";
import { registerSchema } from "../lib/schema";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { commitSession, getSession } from "~/services/session.server";
import { requireUser } from "~/lib/actions/authActions";
import { prisma } from "~/lib/prisma";
import argon2 from "argon2";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  //   console.log(user);

  if (user) {
    return redirect("/");
  }

  return json({ msg: "hello" });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = await formData.get("intent");
  const session = await getSession(request);

  if (intent === "signInWithPassword") {
    const submission = parseWithZod(formData, {
      schema: registerSchema,
    });
    if (submission.status !== "success") {
      return submission.reply();
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: submission.value.email,
      },
    });

    if (userExists) {
      // console.log("USER EXISTS");
      return submission.reply({
        fieldErrors: {
          email: ["email address already exists"],
        },
      });
    }

    const hashedPassword = await argon2.hash(submission.value.password);

    const user = await prisma.user.create({
      data: {
        email: submission.value.email,
        password: hashedPassword,
        fullname: submission.value.fullname,
      },
    });

    session.set("user", submission.value.email);
    session.flash("data", "NEW_USER");

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  console.log("no intent found");
  return json({ msg: "hello" });
}

export default function RegisterRoute() {
  const { state } = useNavigation();
  const lastResult: any = useActionData();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
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
            Create Account
          </h2>

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
              <Input placeholder="Full Name" name="fullname" />
              {fields.fullname.errors ? (
                <p className="text-sm text-red-500">{fields.fullname.errors}</p>
              ) : null}
            </div>

            <div>
              <Input placeholder="Email Address" name="email" />
              {fields.email.errors ? (
                <p className="text-sm text-red-500">{fields.email.errors}</p>
              ) : null}
            </div>

            <div>
              <Input placeholder="Password" name="password" />
              {fields.password.errors ? (
                <p className="text-sm text-red-500">{fields.password.errors}</p>
              ) : null}
            </div>

            <Button name="intent" value="signInWithPassword" className="w-full">
            {state === "loading" ? "Loading" : "Create account"}
            </Button>
          </Form>

          <Link
            to="/terms"
            className="mt-10 md:mt-auto text-xs text-red-500 hover:text-red-600 font-light text-right"
          >
            Fasco Terms and Conditions
          </Link>
          <div>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
