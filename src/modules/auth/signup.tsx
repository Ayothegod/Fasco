
import { Brain } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { authClient } from "@/shared/lib/auth-client";
import { navigate } from "astro:transitions/client";

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

  // http://localhost:5000/api/auth/sign-up/email 403 (Forbidden)

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

  // const {
  //   data: session,
  //   // isPending, //loading state
  //   // error, //error object
  // } = useSession();

  // console.log("Session Data: ", session);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create a new account
          </p>
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
        <div className="grid gap-2">
          <Button variant="outline" className="w-full" onClick={googleSignup}>
            Google
          </Button>
          <Button variant="outline" className="w-full" onClick={githubSignup}>
            GitHub
          </Button>
        </div>

        <Button onClick={register}>With email and password</Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a 
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
