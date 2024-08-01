import { redirect } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export const requireUser = async (request: any) => {
  const session = await getSession(request);
  const user = session.get("user");
  const data = session.get("data");

  if (!user) {
    return null;
  }

  return { user, data, session };
};
