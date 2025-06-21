import { server } from "@/core/config/sanityClient";
import { prisma } from "@/core/database/prisma";
import type { APIRoute, APIContext } from "astro";

export async function GET({ request, params, url: oldUrl }: APIContext) {
  const url = new URL(oldUrl);

  const collection = url.searchParams.get("collection");
  const size = url.searchParams.get("size");
  const price = url.searchParams.get("price");
  const gender = url.searchParams.get("gender");
  const category = url.searchParams.get("category");

  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 12);

  const start = (page - 1) * limit;
  const end = start + limit;

  let priceFilter = "";

  if (price?.includes("-")) {
    const [min, max] = price.split("-").map(Number);
    priceFilter = `price >= ${min} && price <= ${max}`;
  } else if (price?.endsWith("+")) {
    const min = Number(price.replace("+", ""));
    priceFilter = `price >= ${min}`;
  }

  const sortOrder =
    collection === "newArrival"
      ? "desc"
      : collection === "allClothing"
      ? "asc"
      : collection === "bestSelling"
      ? "desc"
      : "desc";

  try {
    const filters = [
      `_type == "product"`,
      gender ? `gender == "${gender}"` : null,
      category ? `subCategory == "${category}"` : null,
      priceFilter,
    ]
      .filter(Boolean)
      .join(" && ");

    const filteredQuery = `
      *[${filters} ${size ? `&& "${size}" in sizes[]` : ""}]
      | order(_createdAt ${sortOrder})
      [${start}...${end}]
    `;

    const completeQuery = `
      *[${filters} ${size ? `&& "${size}" in sizes[]` : ""}]
      | order(_createdAt ${sortOrder})
    `;

    // const products = await server.fetch(query);
    const [filtered, complete] = await Promise.all([
      server.fetch(filteredQuery),
      server.fetch(completeQuery),
    ]);

    console.log(filtered.length, complete.length);

    return Response.json({
      filtered: filtered,
      complete: complete,
      msg: "fetched data successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Unable to fetch data." }, { status: 500 });
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
