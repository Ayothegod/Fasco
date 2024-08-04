import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import bannerImage from "~/assets/fascoAsset/Rectangle 19280.png";
import { Label } from "~/components/ui/label";
import { requireUser } from "~/lib/actions/authActions";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { forgetPasword, generateUserID } from "../lib/schema";

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
    schema: forgetPasword,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const otp = await generateUserID(6)
  console.log(otp);
  console.log(process.env.MAILGUN_API_KEY);

  console.log(submission.value);
  return null
  return redirect("/auth/confirm-otp");
}

export default function ForgetPassword() {
  const { state } = useNavigation();

  const lastResult: any = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: forgetPasword });
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
            Forget Password
          </h2>
          <Label>Enter your email to recover your password</Label>

          <Form method="post" className="space-y-4">
            <div>
              <Input placeholder="Email Address" name="email" />
              {fields.email.errors ? (
                <p className="text-sm text-red-500">{fields.email.errors}</p>
              ) : null}
            </div>

            <Button className="w-full" type="submit">
              {state === "loading" ? "Loading" : "Send confirmation code"}
            </Button>
          </Form>

          <div>
            <span className="text-sm">
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
