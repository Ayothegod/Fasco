import { server } from "@/core/config/sanityClient";
import { prisma } from "@/core/database/prisma";
import type { APIRoute, APIContext } from "astro";

export async function GET({ request, params, url }: APIContext) {
  console.log({ params, url });

  try {
    // const posts = await server.fetch(`*[_type == 'product']`);
    // console.log(posts);

    return Response.json({ posts: "posts" });
    // {message, data}
  } catch (error) {
    return Response.json({ error: "Unable to fetch ssanity data" });
  }
}

export const POST: APIRoute = async ({ request, params, url }) => {
  // GET /api/products?brand=nike&color=red&page=1&limit=20

  // const userId = params.id; // e.g. /api/user/123 → "123"
  const body = await request.json();

  return Response.json({ data: body });
};

export async function PUT({ request }: APIContext) {
  return Response.json({ data: "body" });
}
