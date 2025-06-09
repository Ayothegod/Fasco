import { prisma } from "@/core/database/prisma";
import type { APIRoute } from "astro";

export async function GET({}) {
  return new Response(
    JSON.stringify({ msg: "Welcome to astro server endpoint" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export const POST: APIRoute = async ({ request, params, url }) => {
  // const userId = params.id; // e.g. /api/user/123 → "123"
  // const query = new URL(request.url).searchParams;
  // const debug = query.get("debug");

  const body = await request.json();
  console.log(body);


  const user = await prisma.user.create({
    data: {
      email: "heyaomideadebisi@gmail.com",
      name: "Ayomide",
      emailVerified: false,
      id: "dkdakjajka",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(user);

  return new Response(JSON.stringify({ data: body }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
