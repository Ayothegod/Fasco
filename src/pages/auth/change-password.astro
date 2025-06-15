import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import bannerImage from "~/assets/fascoAsset/Rectangle 19280 (1).png";
import { Label } from "~/components/ui/label";
import { requireUser } from "~/lib/actions/authActions";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { changePassword } from "../lib/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  if (user) {
    return redirect("/");
  }
  return json(null);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: changePassword,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
  return redirect("/login");
}

export default function ChangePassword() {
  const lastResult: any = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changePassword });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <main className="pageStyle flex items-center justify-center">
      <div className="flex mt-20 md:mt-0 w-full sm:max-w-sm md:max-w-3xl border rounded-md overflow-hidden">
        <div className="md:max-w-[50%] hidden md:block">
          <img
            src={bannerImage}
            alt="banner-image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-[50%] flex flex-col justify-center px-8 py-4 space-y-4">
          <h2 className="text-lg font-serif font-bold tracking-wide">
            Enter your new password
          </h2>

          <Form method="post" className="space-y-4">
            <div>
              <Input placeholder="Enter your new password" name="password" />
              {fields.password.errors ? (
                <p className="text-sm text-red-500 mt-2">
                  {fields.password.errors}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                placeholder="Confirm your password"
                name="confirmPassword"
              />
              {fields.confirmPassword.errors ? (
                <p className="text-sm text-red-500 mt-2">
                  {fields.confirmPassword.errors}
                </p>
              ) : null}
            </div>

            <Button className="w-full" type="submit">
              Change password
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
}
