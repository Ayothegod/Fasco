import { authClient } from "../lib/auth-client";

export default function TestPage() {
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

    console.log(session);
    

  return <div>This is the test page</div>;
}
