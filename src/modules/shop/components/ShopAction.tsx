// import { LayoutGrid, Menu } from "lucide-react";
import slider from "@/assets/images/slider.png";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import FollowUs from "~/components/build/FollowUs";
// import Newsletter from "~/components/build/Newsletter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  genders,
  priceRange,
  sizes,
  subCategories,
} from "../services/constants";
import { query } from "../services/useSearchParams";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { db } from "@/shared/lib/seed";
import api from "@/core/config/axios";
import type { AxiosResponse } from "axios";
import type { Product } from "../services/type";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { getPaginationRange } from "../services/paginationRange";

export default function ShopAction() {
  useEffect(() => {
    const page = query.get("page");
    if (!page) {
      query.set("page", "1");
    }

    const collection = query.get("collection");
    if (!collection) {
      query.set("collection", "allClothing");
    }
  }, []);

  const collection = query.get("collection") ?? "";

  const size = query.get("size") ?? "";
  const [selectedSize, setSelectedSize] = useState<string | null>(size);

  const price = query.get("price") ?? "";
  const [selectedPrice, setSelectedPrice] = useState<string | null>(price);

  const gender = query.get("gender") ?? "";
  const [selectedGender, setSelectedGender] = useState<string | null>(gender);

  const category = query.get("category") ?? "";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category
  );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [completeProducts, setCompleteProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const page = query.get("page") ?? "1";
  let limit = "12";

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res: AxiosResponse<
        { msg: string; filtered: Product[]; complete: Product[] },
        any
      > = await api.get(`/products`, {
        params: { page, collection, gender, price, category, size, limit },
      });
      // console.log(res.data);

      setFilteredProducts(res.data.filtered ?? []);
      setCompleteProducts(res.data.complete ?? []);
    } catch (err) {
      console.log("Error", err);
      // NOTE: handle errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [window.location.search]);

  const totalPages = Math.round(completeProducts.length / 12);
  // console.log(totalPages, filteredProducts.length, completeProducts.length);

  const getHref = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", page.toString());
    return `/shop?${currentParams.toString()}`;
  };

  const newQuery = new URLSearchParams(window.location.search);

  const prevPage = Math.max(1, Number(page) - 1);
  newQuery.set("page", prevPage.toString());
  const prevHref = `?${newQuery.toString()}`;

  const nextPage = Math.min(totalPages, Number(page) + 1);
  newQuery.set("page", nextPage.toString());
  const nextHref = `?${newQuery.toString()}`;

  return (
    <main className="min-h-[60vh]">
      <aside className="pageStyle ">
        <h2 className="text-4xl font-serif font-bold tracking-wide text-center">
          Fashion
        </h2>
        <Breadcrumb className="flex items-center justify-center gap-4 mt-4 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </aside>

      <section className="pageStyle mt-8 flex gap-x-4">
        <aside className="hidden md:block w-[30%] lg:w-[25%]">
          {/* NOTE: <Filters /> */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Gender
              </h4>

              <div className="flex items-center gap-4">
                {genders.map((g, i) => (
                  <button
                    key={i}
                    className={`font-light border py-1 px-2 rounded hover:font-medium cursor-pointer
                      ${
                        selectedGender === g
                          ? "border-blue-500 font-medium text-blue-500 border hover:border-blue-300"
                          : "border-gray-300"
                      }`}
                    onClick={() => {
                      if (selectedGender === g) {
                        setSelectedGender(null);
                        query.delete("gender");
                      } else {
                        setSelectedGender(g);
                        query.set("gender", g);
                      }
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Category
              </h4>

              <div className="flex items-start flex-col gap-1">
                {subCategories.map((category, i) => (
                  <p
                    key={i}
                    className={`font-light py-2 px-4 hover:font-medium cursor-pointer
                      ${
                        selectedCategory === category
                          ? "font-medium text-blue-500"
                          : ""
                      }`}
                    onClick={() => {
                      if (selectedCategory === category) {
                        setSelectedCategory(null);
                        query.delete("category");
                      } else {
                        setSelectedCategory(category);
                        query.set("category", category);
                      }
                    }}
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Size
              </h4>

              <div className="flex items-center gap-4">
                {sizes.map((s, i) => (
                  <button
                    key={i}
                    className={`font-light border py-1 px-4 rounded hover:font-medium cursor-pointer
                      ${
                        selectedSize === s
                          ? "border-blue-500 font-medium text-blue-500 hover:border-blue-300"
                          : "border-gray-300"
                      }`}
                    onClick={() => {
                      if (selectedSize === s) {
                        setSelectedSize(null);
                        query.delete("size");
                      } else {
                        setSelectedSize(s);
                        query.set("size", s);
                      }
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Prices
              </h4>
              <div className="flex flex-col gap-2">
                {priceRange.map((price) => (
                  <button
                    key={price.price}
                    className={`font-light py-2 px-4 rounded hover:font-medium text-left cursor-pointer 
                      ${
                        selectedPrice === price.price
                          ? "border-blue-500 font-medium text-blue-500 hover:border-blue-300"
                          : "border-gray-300"
                      }`}
                    onClick={() => {
                      if (selectedPrice === price.price) {
                        setSelectedPrice(null);
                        query.delete("size");
                      } else {
                        setSelectedPrice(price.price);
                        query.set("price", price.price);
                      }
                    }}
                  >
                    {price.value}
                  </button>
                ))}
              </div>

              {/* <div className="space-y-2">
                <h4 className="text-lg font-serif font-bold tracking-wide">
                  Colors
                </h4>
                <div className="flex items-start flex-wrap gap-1">
                  {colors.map((color, i) => (
                    <p
                      key={i}
                      style={{ backgroundColor: color }}
                      className={`h-6 w-6 rounded-full cursor-pointer border
                      ${selectedColor === color ? "border border-blue-500" : ""}
                      `}
                      onClick={() => {
                        console.log(color);
                        setSelectedCategory(color);
                        query.set("color", color);
                      }}
                    ></p>
                  ))}
                </div>
              </div> */}
            </div>
          </section>
        </aside>

        <main className="w-full">
          <Select
            onValueChange={(value) => {
              query.set("collection", value);
            }}
            defaultValue={collection}
          >
            <SelectTrigger className="w-[180px] ml-auto">
              <SelectValue placeholder="Collections" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="allClothing">All Clothing</SelectItem>
                <SelectItem value="bestSelling">Best Selling</SelectItem>
                <SelectItem value="newArrivals">New Arrivals</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="mt-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((skeleton, i) => (
                  <div className="h-[520px]" key={i}>
                    <div className="h-full flex flex-col gap-2">
                      <Skeleton className="w-full max-h-4/5 h-full object-cover border border-neutral-100" />
                      <div className="h-1/5 w-full flex gap-4 items-center justify-between px-2">
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-5 w-[200px]" />
                        </div>
                        <Skeleton className="h-7 w-7 rounded-full bg-red-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <a
                      href={`/products/${product.slug.current}`}
                      key={product.slug.current}
                      className="h-[520px] "
                    >
                      <div className="h-full flex flex-col gap-2">
                        <img
                          src={product.imageUrl || "https://placehold.co/400"}
                          alt={`image-${product.productName}`}
                          className=" w-full max-h-4/5 h-full object-cover border border-neutral-100"
                        />
                        <div className="h-1/5 w-full flex gap-4 items-center justify-between px-2">
                          <div className="flex flex-col">
                            <p className="font-medium text-lg">
                              {product.productName}
                            </p>
                            <p className="font-light">
                              <span className="font-medium">
                                ${product.price}
                              </span>
                            </p>
                          </div>
                          <p
                            className={`h-7 w-7 rounded-full shrink-0`}
                            style={{ backgroundColor: product.color }}
                          ></p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Pagination className="mt-20">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={Number(page) > 1 ? prevHref : undefined}
                  aria-disabled={Number(page) <= 1}
                  className={
                    Number(page) <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {getPaginationRange(Number(page), totalPages).map((item, i) => {
                if (item === "...") {
                  return (
                    <PaginationItem key={`dots-${i}`}>
                      <span className="px-2 text-gray-400">...</span>
                    </PaginationItem>
                  );
                }

                const isCurrent = item === Number(page);

                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      isActive={isCurrent}
                      href={isCurrent ? undefined : getHref(item)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={
                        isCurrent ? "pointer-events-none opacity-50" : ""
                      }
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href={Number(page) !== totalPages ? nextHref : undefined}
                  aria-disabled={Number(page) == totalPages}
                  className={
                    Number(page) == totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {/* <AppPagination currentPage={page} totalPages={totalPages} basePath="/products" /> */}
        </main>
      </section>

      <section className="hidden md:block mt-16 mb-16">
        <img src={slider.src} alt="top-banner-image" className="" />
      </section>

      {/* <FollowUs /> */}
      {/* <Newsletter /> */}
    </main>
  );
}
