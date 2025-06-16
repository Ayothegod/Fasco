import { LayoutGrid, Menu } from "lucide-react";
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
// import { stateStore } from "~/lib/store";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function ShopAction() {
  // const { user } = stateStore();
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

  const [defaultLayout, setDefaultLayout] = useState("grid");
  const updateDefaultLayout = () => {
    if (defaultLayout === "grid") {
      setDefaultLayout("flat");
    } else {
      setDefaultLayout("grid");
    }
  };

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
          <h3 className="text-xl font-serif font-bold tracking-wide">
            Filters
          </h3>
          {/* NOTE: <Filters /> */}
          <section className="space-y-6 mt-8">
            <div className="space-y-2">
              <h4 className="text-xs font-serif font-bold tracking-wide">
                Size
              </h4>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  S
                </Button>
                <Button variant="outline" size="sm">
                  M
                </Button>
                <Button variant="outline" size="sm">
                  L
                </Button>
                <Button variant="outline" size="sm">
                  XL
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-serif font-bold tracking-wide">
                Prices
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-medium">$0 - $49</p>
                <p className="text-sm text-medium">$50 - $99</p>
                <p className="text-sm text-medium">$100 - $199</p>
                <p className="text-sm text-medium">$200 - $*</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-serif font-bold tracking-wide">
                Collections
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-medium">All products</p>
                <p className="text-sm text-medium">Best sellers</p>
                <p className="text-sm text-medium">New arrivals</p>
                <p className="text-sm text-medium">Accessories</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-serif font-bold tracking-wide">
                Tags
              </h4>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm text-medium">Fashion</span>
                <span className="text-sm text-medium">Belt</span>
                <span className="text-sm text-medium">Sandals</span>
                <span className="text-sm text-medium">Bags</span>
                <span className="text-sm text-medium">Sunglasses</span>
                <span className="text-sm text-medium">Beachwear</span>
              </div>
            </div>
          </section>
        </aside>

        <main className="px-2 w-full">
          <form>
            <input type="hidden" name="selectedValue" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Collections" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Clothing type</SelectLabel>
                  <SelectItem value="allClothing">All Clothing</SelectItem>
                  <SelectItem value="bestSelling">Best Selling</SelectItem>
                  <SelectItem value="newArrivals">New Arrivals</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </form>

          <div className="mt-4">
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
                            className=" w-full max-h-4/5 h-full object-cover border"
                          />
                          <div className="h-1/5 w-full flex items-center justify-between px-2">
                            <div className="flex flex-col">
                              <p className="font-medium">{product.title}</p>
                              <p>${product.price}</p>
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
          </div>
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
