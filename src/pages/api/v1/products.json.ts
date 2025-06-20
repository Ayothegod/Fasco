import { server } from "@/core/config/sanityClient";
import { prisma } from "@/core/database/prisma";
import type { APIRoute } from "astro";

// NOTE: /api/v1/shop.json
// /api/v1/products.json

export async function GET({}) {
  try {
    const posts = await server.fetch(`*[_type == 'product']`);
    // console.log(posts);

    return Response.json({ posts });
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
