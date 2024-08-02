import { Form } from "@remix-run/react";
import { Button } from "../ui/button";
import { stateStore } from "~/lib/store";

export default function LogOut() {
  const { updateUser } = stateStore();
  const removeUserData = () => {
    updateUser("");
  };

  return (
    <Form method="post" action="/login">
      <Button name="intent" value="logout" onClick={removeUserData}>
        Logout now
      </Button>
    </Form>
  );
}
