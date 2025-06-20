import { server } from "@/core/config/sanityClient";
import { prisma } from "@/core/database/prisma";
import type { APIRoute } from "astro";

export async function GET({}) {
  try {
    const posts = await server.fetch(`*[]`);
    console.log(posts);
    

    return new Response(
      JSON.stringify({ msg: "Welcome to astro server endpoint" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch ssanity data" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
