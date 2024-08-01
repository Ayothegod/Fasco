import { createCookieSessionStorage } from "@remix-run/node";

// Initialize the session storage
const sessionSecret = process.env.SESSION_SECRET || "super-secret-key";
const service = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function getSession(request: any) {
  return service.getSession(request.headers.get("Cookie"));
}

export async function commitSession(session: any) {
  return service.commitSession(session);
}

export async function destroySession(session: any) {
  return service.destroySession(session);
}
