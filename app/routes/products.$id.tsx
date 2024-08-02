import { LoaderFunctionArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import {
  Car,
  ReceiptText,
  Share,
  ShieldQuestion,
  ShoppingBag,
  ShoppingBasket,
  Star,
} from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import slider from "~/assets/fascoAsset/slider.png";
import FollowUs from "~/components/build/FollowUs";
import Newsletter from "~/components/build/Newsletter";
import { Skeleton } from "~/components/ui/skeleton";
import { cartStore, stateStore } from "~/lib/store";

export async function loader({ params }: LoaderFunctionArgs) {
  //   console.log(params);
  return null;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function Product() {
  const {
    cart,
    addItemToCart,
    decreaseQuantity,
    increaseQuantity,
    getItemQuantity,
  } = cartStore();
  const { setOpenCartSidebar, user } = stateStore();

  const param = useParams();
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products/${param.id}`,
    fetcher
  );
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");
  const buttonSizes = ["S", "M", "L", "XL"];
  const buttonSelected = (button: any) => {
    const selected = button ? button : selectedSize;
    setSelectedSize(button);
    console.log(selected);
  };

  const quantity: any = getItemQuantity(data?.id);

  const addToCart = () => {
    const newItem = {
      title: data.title,
      thumbnail: data.thumbnail,
      price: data.price,
      selectedSize: selectedSize,
      quantity: quantity,
      description: data.description,
      id: data.id,
      category: data.category,
    };
    setIsAddedToCart(!isAddedToCart);
    addItemToCart(newItem);
  };

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div>
      <section className="pageStyle ">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
          Product
        </h2>
        <Breadcrumb className="flex items-center justify-center gap-4 mt-2 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product - {param.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="border w-full md:w-1/2 flex gap-2">
          <div className="w-[20%] border flex flex-col gap-1">
            {isLoading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              data?.images.map((data: any, index: any) => (
                <div key={data} className="border w-full">
                  <img src={data} alt={`image-${index}`} className="w-full " />
                </div>
              ))
            )}
          </div>

          {isLoading ? (
            <Skeleton className="h-full w-[80%] ml-auto" />
          ) : (
            <img
              src={data?.thumbnail}
              alt={`image - ${data?.title}`}
              className="w-[80%] border object-contain ml-auto"
            />
          )}
        </div>

        <div className=" flex flex-col gap-4  w-full md:max-w-1/2 flex-1 ">
          <div className="flex items-center justify-between">
            {isLoading ? (
              <Skeleton className="h-8 w-[400px]" />
            ) : (
              <h1 className="font-bold text-xl">{data?.title}</h1>
            )}
            <Star />
          </div>

          <div>
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <h1 className="">{data?.description}</h1>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <Skeleton className="h-6 w-[240px]" />
            ) : (
              <p className="font-bold">${data?.price}</p>
            )}

            <span className="text-xs bg-red-600 p-2 text-white rounded-md">
              {data?.availabilityStatus}
            </span>
          </div>

          <div className="w-full bg-pink-100 border border-pink-200 py-2 flex items-center justify-center rounded-md">
            <p>Hurry up and buy stuff</p>
          </div>

          <div className="">
            <p className="font-bold text-sm">size: {selectedSize}</p>
            <div className="flex gap-4 mt-2">
              {buttonSizes.map((button) => (
                <Button
                  key={button}
                  variant="outline"
                  onClick={() => buttonSelected(button)}
                  className={`${
                    selectedSize === button &&
                    "bg-black hover:bg-black/90 text-white hover:text-white"
                  }`}
                >
                  {button}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Available colors</p>
            <div className="flex gap-2 mt-2">
              <div className="h-6 w-6 bg-red-500 rounded-full"></div>
              <div className="h-6 w-6 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <p className="font-bold text-sm">Quantity</p>
            <div className="mt-2">
              <Button
                className="rounded-none rounded-l-md px-8"
                variant="outline"
                onClick={() => decreaseQuantity(data?.id)}
              >
                -
              </Button>
              <Button className="rounded-none px-8" variant="outline">
                {quantity}
              </Button>
              <Button
                className="rounded-none rounded-r-md px-8"
                variant="outline"
                onClick={() => increaseQuantity(data?.id)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            {!isAddedToCart ? (
              <Button
                className="flex items-center justify-center w-full gap-8"
                onClick={addToCart}
                disabled={!user}
              >
                <ShoppingBag /> Add to cart
              </Button>
            ) : (
              <Button
                disabled={!user}
                className=" w-full"
                onClick={setOpenCartSidebar}
              >
                Open cart
              </Button>
            )}
          </div>

          <div className="mt-10 space-y-2">
            <div className="flex gap-4">
              <div className="text-xs flex items-center gap-2 cursor-pointer border border-white hover:border-neutral-200 w-max rounded-md p-1">
                <ShieldQuestion className="h-4 w-4" />
                <p>Ask a question</p>
              </div>
              <div className="text-xs flex items-center gap-2 cursor-pointer border border-white hover:border-neutral-200 w-max rounded-md p-1">
                <Share className="h-4 w-4" />
                <p>Share</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Car className="" />
              <p className="font-medium text-sm">
                Estimated delivery time:{" "}
                <span className="font-normal">TIME</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ReceiptText className="" />
              <p className="font-medium text-sm">
                Free shipping and returns:{" "}
                <span className="font-normal">On all orders over $70</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="hidden md:block mt-16 mb-16">
        <img src={slider} alt="top-banner-image" className="" />
      </section>
      <FollowUs />
      <Newsletter />
    </div>
  );
}
