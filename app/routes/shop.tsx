// import FollowUs from "../components/build/FollowUs";
// import Newsletter from "../components/build/Newsletter";
// import slider from "../fascoAsset/slider.png";
// import client from "../sanity/client";

import Filters from "../components/build/Filters";
import Crucible from "../components/utils/Crucible";
import { Menu, LayoutDashboard, LayoutGrid } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectSeparator,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import {
  Form,
  json,
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import Newsletter from "~/components/build/Newsletter";
import FollowUs from "~/components/build/FollowUs";
import clsx from "clsx";
import useSWR from "swr";
import { Skeleton } from "~/components/ui/skeleton";
import slider from "~/assets/fascoAsset/slider.png";
// export async function Loader({ request }: LoaderFunctionArgs) {
//   try {
//     const url = new URL(request.url);
//     const searchParams = new URLSearchParams(url.search);
//     const searchData = searchParams.get("tab")
//     // console.log(searchData);

//     let query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`

//     if (searchData) {
//       if (searchData === "allClothing") {
//         query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       }
//       else if (searchData === "bestSelling") {
//         query = `*[_type == "cloth" && "best-selling" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       }
//       else if (searchData === "newArrivals") {
//         query = `*[_type == "cloth" && "new-arrivals" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       }
//       else if (searchData === "accessories") {
//         query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       }

//       const result = await getAllCloths(query)
//       console.log({ result });
//       return json({ result })
//     }

//     const result = await getAllCloths(query)
//     return json({ result });
//   } catch (error) {
//     return json({ error: "An error occured!" });
//   }
// }

// export async function Action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const url = new URL(request.url);
//   const searchParams = new URLSearchParams(url.search);
//   // const intent = await formData.get("intent");

//   const selectedValue = formData.get("selectedValue");
//   // let query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`

//   if (selectedValue) {
//     if (selectedValue === "allClothing") {
//       // query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       searchParams.set("tab", "allClothing");
//       url.search = searchParams.toString();
//     }
//     else if (selectedValue === "bestSelling") {
//       // query = `*[_type == "cloth" && "best-selling" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       searchParams.set("tab", "bestSelling");
//       url.search = searchParams.toString();
//     }
//     else if (selectedValue === "newArrivals") {
//       // query = `*[_type == "cloth" && "new-arrivals" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       searchParams.set("tab", "newArrivals");
//       url.search = searchParams.toString();
//     }
//     else if (selectedValue === "accessories") {
//       // query = `*[_type == "cloth" && "all-products" in tags]{name, _id, slug, price, image,tags, colors, sizes}`
//       searchParams.set("tab", "accessories");
//       url.search = searchParams.toString();
//     }

//     // const result = await getAllCloths(query)
//     // console.log(result);
//     return redirect(url.toString());
//   }

//   // if (selectedValue === "allClothing") {
//   //   searchParams.set("tab", "allClothing");
//   //   url.search = searchParams.toString();
//   //   return redirect(url.toString());
//   // }

//   // if (selectedValue === "bestSelling") {
//   //   searchParams.set("tab", "bestSelling");
//   //   url.search = searchParams.toString();
//   //   return redirect(url.toString());
//   // }

//   // if (selectedValue === "newArrivals") {
//   //   searchParams.set("tab", "newArrivals");
//   //   url.search = searchParams.toString();
//   //   return redirect(url.toString());
//   // }

//   // if (selectedValue === "accessories") {
//   //   searchParams.set("tab", "accessories");
//   //   url.search = searchParams.toString();
//   //   return redirect(url.toString());
//   // }

//   // const search = await formData.get("search");
//   // const age = await formData.get("age");

//   // const url = new URL(request.url);
//   // const searchParams = new URLSearchParams(url.search);

//   // if (search) {
//   //   searchParams.set("search", search.toString());
//   // }
//   // if (age) {
//   //   searchParams.set("age", age.toString());
//   // }

//   // url.search = searchParams.toString();

//   // return redirect(url.toString());

//   console.log("NOTAVALUE");
//   return null;

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Shop() {
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products/category/womens-dresses",
    fetcher
  );
  // console.log(data);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setProducts(data.products); // Assuming data has a `products` field
    }
  }, [data]);
  // console.log(products);

  const [defaultLayout, setDefaultLayout] = useState("grid");
  const updateDefaultLayout = () => {
    if (defaultLayout === "grid") {
      setDefaultLayout("flat");
    } else {
      setDefaultLayout("grid");
    }
  };

  //   const [searchParams, setSearchParams] = useSearchParams();

  //   const handleSearch = (e: any) => {
  //     //   const currentSearchParams = new URLSearchParams(searchParams);
  //     //   currentSearchParams.set("search", "e.target.value");
  //     //   setSearchParams(currentSearchParams);
  //       const newsearch = searchParams.set("search", "e.target.value")
  //     };
  //   const handleChange = (event: any) => {
  //     const search = event.target.value;
  //     setSearchParams((prevParams) => {
  //       const newParams = new URLSearchParams(prevParams);
  //       newParams.set("search", search);
  //       return newParams;
  //     });
  //   };

  return (
    <main className="min-h-[60vh]">
      <section className="pageStyle ">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
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
      </section>

      <section className="pageStyle mt-8 flex gap-x-4">
        <aside className="hidden md:block w-[30%] lg:w-[25%]">
          <h3 className="text-xl font-serif font-bold tracking-wide">
            Filters
          </h3>
          {/* <Filters /> */}
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
          <div className="flex items-center justify-between">
            <Form method="post">
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
            </Form>

            <div className="flex items-center gap-2">
              {/* <LayoutGrid className={clsx("border h-8 w-8 p-1 rounded-md", {})} /> */}
              <LayoutGrid
                onClick={() => setDefaultLayout("grid")}
                className={`border h-8 w-8 p-1 rounded-md cursor-pointer ${
                  defaultLayout == "grid" &&
                  " cursor-not-allowed text-neutral-300"
                }`}
              />
              <Menu
                onClick={updateDefaultLayout}
                className={`border h-8 w-8 p-1 rounded-md cursor-pointer ${
                  defaultLayout == "flat" &&
                  " cursor-not-allowed text-neutral-300"
                }`}
              />
            </div>
          </div>

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product: any, index) => (
                      <Link
                        to={`/products/${product.id}`}
                        key={product.id}
                        className=""
                      >
                        <img
                          src={product.thumbnail || "https://placehold.co/400"}
                          alt={`image-${product.title}`}
                          className=" w-full h-auto"
                        />
                        <div className="mt-4">
                          <p className="font-medium">{product.title}</p>
                          <div className="flex items-center justify-between text-sm">
                            <p>${product.price}</p>
                            <p>{product.availabilityStatus}</p>
                          </div>
                        </div>
                      </Link>
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
      <img src={slider} alt="top-banner-image" className="" />
      </section>

      <FollowUs />
      <Newsletter />
    </main>
  );
}
