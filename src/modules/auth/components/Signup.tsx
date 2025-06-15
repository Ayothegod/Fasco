import { Brain } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { authClient } from "@/shared/lib/auth-client";
import { navigate } from "astro:transitions/client";
import { Input } from "@/shared/components/ui/input";
// const {
//   data: session,
//   // isPending, //loading state
//   // error, //error object
// } = useSession();

// console.log("Session Data: ", session);

export default function SignupPage() {
  const githubSignup = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/auth/error",
      newUserCallbackURL: "/onboarding",
      disableRedirect: false,
    });

    console.log(data);
    console.log(error);
  };

  const googleSignup = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/auth/error",
      newUserCallbackURL: "/onboarding",
      disableRedirect: false,
    });

    console.log(data);
    console.log(error);
  };

  const register = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: "heyskskddsjsdy@gmail.com",
        password: "12345678",
        name: "Ayomide",
        // image, // user image url (optional)
        callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("testing loding");
        },
        onSuccess: (ctx) => {
          navigate("/onboarding");
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );

    console.log(data);
    console.log(error);
  };

  const state = false;

  return (
    <div className="w-full md:w-[50%] flex flex-col justify-center px-8 py-4 space-y-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">One click signup</p>
        </div>

        <div className="grid gap-2">
          <Button variant="outline" className="w-full" onClick={googleSignup}>
            Google
          </Button>
          <Button variant="outline" className="w-full" onClick={githubSignup}>
            GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <Input placeholder="Full Name" name="fullname" />
            {/* {fields.fullname.errors ? (
              <p className="text-sm text-red-500">{fields.fullname.errors}</p>
            ) : null} */}
          </div>

          <div>
            <Input placeholder="Email Address" name="email" />
            {/* {fields.email.errors ? (
              <p className="text-sm text-red-500">{fields.email.errors}</p>
            ) : null} */}
          </div>

          <div>
            <Input placeholder="Password" name="password" />
            {/* {fields.password.errors ? (
              <p className="text-sm text-red-500">{fields.password.errors}</p>
            ) : null} */}
          </div>

          <Button onClick={register}>With email and password</Button>
          <Button name="intent" value="signInWithPassword" className="w-full">
            {state ? "Loading" : "Create account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-primary underline-offset-4 hover:underline"
          >
            Log in
          </a>
        </div>

        <a
          href="/terms"
          className="mt-10 md:mt-auto text-xs text-red-500 hover:text-red-600 font-light text-right"
        >
          Fasco Terms and Conditions
        </a>
      </div>
    </div>
  );
}
