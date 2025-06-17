// import { LayoutGrid, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import slider from "@/assets/images/slider.png";
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
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { query } from "../services/useSearchParams";
import { Input } from "@/shared/components/ui/input";
// import { stateStore } from "~/lib/store";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function ShopAction() {
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products/category/womens-dresses",
    fetcher
  );

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    const collection = query.get("collection");
    if (!collection) {
      query.set("collection", "allClothing");
    }
  }, []);

  const collection = query.get("collection") ?? "";
  const size = query.get("size") ?? "";

  // const [newSize, setNewSize] = useState(size ?? "");

  // const name = query.get("name");
  // const [value, setValue] = useState(name ? name : "");

  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<string | null>(size);

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
          <h3 className="text-2xl font-serif font-bold tracking-wide">
            Filters
          </h3>
          {/* NOTE: <Filters /> */}
          <section className="space-y-6 mt-8">
            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Size
              </h4>

              <div className="flex items-center gap-4">
                {sizes.map((s, i) => (
                  <button
                    key={i}
                    className={`font-light border py-2 px-4 rounded hover:font-medium 
                      
                      
                      ${
                        selectedSize === s
                          ? "border-blue-500 font-medium text-blue-500 hover:border-blue-300"
                          : "border-gray-300"
                      }`}
                    onClick={() => {
                      setSelectedSize(s);
                      query.set("size", s);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Colors
              </h4>
            </div>

            <div className="space-y-2">
              <h4 className="text font-serif font-bold tracking-wide">
                Prices
              </h4>
              <div className="space-y-2">
                <p className="font-light">$0 - $49</p>
                <p className="font-light">$50 - $99</p>
                <p className="font-light">$100 - $199</p>
                <p className="font-light">$200 - $*</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Collections
              </h4>
              <div className="space-y-2">
                <p className="font-light">All products</p>
                <p className="font-light">Best sellers</p>
                <p className="font-light">New arrivals</p>
                <p className="font-light">Accessories</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold tracking-wide">
                Tags
              </h4>
              <div className="flex gap-2 flex-wrap">
                <span className="font-light">Fashion</span>
                <span className="font-light">Belt</span>
                <span className="font-light">Sandals</span>
                <span className="font-light">Bags</span>
                <span className="font-light">Sunglasses</span>
                <span className="font-light">Beachwear</span>
              </div>
            </div>
          </section>
        </aside>

        <main className="px-2 w-full">
          <Select
            onValueChange={(value) => {
              query.set("collection", value);
            }}
            defaultValue={collection}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Collections" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="allClothing">All Clothing</SelectItem>
                <SelectItem value="bestSelling">Best Selling</SelectItem>
                <SelectItem value="newArrivals">New Arrivals</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <div className="mt-4">
            {isLoading ? (
              <div>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <div>
                {defaultLayout === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product: any, index) => (
                      <a
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="h-[520px] "
                      >
                        <div className="h-full flex flex-col gap-2">
                          <img
                            src={
                              product.thumbnail || "https://placehold.co/400"
                            }
                            alt={`image-${product.title}`}
                            className=" w-full max-h-4/5 h-full object-cover border border-neutral-100"
                          />
                          <div className="h-1/5 w-full flex gap-4 items-center justify-between px-2">
                            <div className="flex flex-col">
                              <p className="font-medium text-lg">
                                {product.title}
                              </p>
                              <p className="font-light">
                                ${" "}
                                <span className="font-medium">
                                  {product.price}
                                </span>
                              </p>
                            </div>
                            <p className="h-7 w-7 rounded-full bg-red-400"></p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  "Hello"
                )}
              </div>
            )}
          </div> */}
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
