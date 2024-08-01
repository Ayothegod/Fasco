// import FollowUs from "../components/build/FollowUs";
// import Newsletter from "../components/build/Newsletter";
// import slider from "../fascoAsset/slider.png";
// import client from "../sanity/client";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  json,
  redirect,
  useLoaderData,
  useSubmit,
  useFetcher
} from "react-router-dom";
import Filters from "../components/build/Filters";
import Crucible from "../components/utils/Crucible";
import { getAllCloths } from "../services/sanityActions";
import { Menu } from "lucide-react";
import { urlFor } from "../components/utils/UrlFor";
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
// }

export default function Shop() {
  const loaderData: any = useLoaderData();
  // console.log(loaderData);
  const fetcher = useFetcher();

  const submit = useSubmit();
  const [selectedValue, setSelectedValue] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
    setShouldSubmit(!shouldSubmit);
  };

  useEffect(() => {
    if (selectedValue && shouldSubmit) {
      const formData = new FormData();
      formData.append("selectedValue", selectedValue);
      submit(formData, { method: "post" });
      setShouldSubmit(!shouldSubmit);
    }
  }, [selectedValue, submit]);

  // React.useEffect(() => {
  //   fetcher.submit(data, options);
  //   fetcher.load(href);
  // }, [fetcher]);

  // fetcher.formData;
  // fetcher.json;
  // fetcher.text;
  // fetcher.formMethod;
  // fetcher.formAction;
  // fetcher.data;

  //   return <fetcher.Form />;

  return (
    <main className="min-h-[60vh]">
      <section className="pageStyle ">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
          Fashion
        </h2>
        <Crucible backLink="/" backTitle="Home" presentTitle="Fashion" />
      </section>

      <section className="pageStyle mt-8 flex divide-x-4">
        {/* filter */}
        <aside className="hidden md:block w-[25%] lg:w-[20%] px-2">
          <h3 className="text-xl font-serif font-bold tracking-wide">
            Filters
          </h3>
          {/* <Filters /> */}
          <section className="space-y-6 mt-8">
            <div className="space-y-2">
              <h4 className="text-xs font-serif font-bold tracking-wide">
                Size
              </h4>
              
              <fetcher.Form method="post" action="/some/route">
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
              </fetcher.Form>
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

        {/* products */}
        <main className="px-2 w-full">

          {/* top */}
          <div className="flex items-center justify-between">
            <Form method="post">
              <input type="hidden" name="selectedValue" value={selectedValue} />
              <Select onValueChange={handleSelectChange}>
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
              {/* <button type="submit">Submit</button> */}
            </Form>

            <div>
              <Menu className="border h-8 w-8 p-1 rounded-md" />
            </div>
          </div>

          {/* display filtered data */}
          <div>
            {/* {
              loaderData.result.map((data: any) => (
                <div key={data._id} className="bg-neutral-400 p-4 flex flex-col gap-2 rounded-md">
                  <p>{data.name}</p>
                </div>
              ))
            } */}
          </div>


        </main>
      </section>

      {/* <Form method="post">
            <Button
              variant="default"
              name="intent"
              value="allClothing"
              className="m-0 p-0 border-none outline-none w-full font-normal bg-none"
            >
              Log Data
            </Button>
          </Form> */}

      {/* <section className="hidden md:block mt-16 mb-16">
      <img src={slider} alt="top-banner-image" className="" />
    </section> */}

      {/* Follow us on instagram */}
      {/* <FollowUs /> */}

      {/* Newsletter */}
      {/* <Newsletter /> */}
    </main>
  );
}
