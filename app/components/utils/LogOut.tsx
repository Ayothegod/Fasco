import { Form } from "@remix-run/react";
import { Button } from "../ui/button";

export default function LogOut() {
  return (
    <Form method="post" action="/login">
      <Button name="intent" value="logout">
        Logout now
      </Button>
    </Form>
  );
}
