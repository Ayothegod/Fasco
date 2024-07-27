import { Form } from "@remix-run/react";
import { Button } from "../ui/button";
// if (intent === "logout") {
//   const deleteSession = await logout();
//   return json(null);
// }

export default function LogOut() {
  return (
    <Form method="post">
      <Button name="intent" value="logout">
        Logout now
      </Button>
    </Form>
  );
}
