import { server } from "@/core/config/sanityClient";
import type { APIContext } from "astro";

export async function GET({ params, url }: APIContext) {
  const id = params.id;
  try {
    // const posts = await server.fetch(`*[_type == 'product']`);
    // console.log(posts);

    return Response.json({ posts: "posts" });
    // {message, data}
  } catch (error) {
    return Response.json({ error: "Unable to fetch ssanity data" });
  }
}

export async function getProductBySlug(currentSlug: string) {
  return server.fetch(
    `*[_type == "product" && slug.current == "${currentSlug}"]`
  );
}
