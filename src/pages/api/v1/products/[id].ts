import type { APIContext } from "astro";

export async function GET({ params, url }: APIContext) {
  const id = params.id
  // console.log({ params, url });

  try {
    // const posts = await server.fetch(`*[_type == 'product']`);
    // console.log(posts);

    return Response.json({ posts: "posts" });
    // {message, data}
  } catch (error) {
    return Response.json({ error: "Unable to fetch ssanity data" });
  }
}