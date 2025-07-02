import {
  Car,
  ReceiptText,
  Share,
  ShieldQuestion,
  ShoppingBag,
  ShoppingBasket,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "@/shared/components/ui/button";
import slider from "@/assets/images/slider.png";
import Newsletter from "@/modules/index/components/Newsletter";
import FollowUs from "@/modules/index/components/FollowUs";
import { Skeleton } from "@/shared/components/ui/skeleton";
// import { cartStore, stateStore } from "~/lib/store";
import type { Product } from "@/modules/shop/services/type";
import { Progress } from "@/shared/components/ui/progress";
import { formatted, getStockMessage } from "../services/productUtil";
import { query } from "@/modules/shop/services/useSearchParams";
import { toast } from "@pheralb/toast";

// const fetcher = (url: any) => fetch(url).then((res) => res.json());
//   const { data, error, isLoading } = useSWR(
//     `https://dummyjson.com/products/${param.id}`,
//     fetcher
//   );

export default function ProductAction({ product }: { product: Product }) {
  const message = getStockMessage(product.stock);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const size = query.get("size");
    if (!size) {
      query.set("size", product.sizes[0]);
    }

    const quantity = query.get("quantity");
    if (!quantity) {
      query.set("quantity", "1");
    }
  }, []);

  const size = query.get("size") ?? "";
  const [selectedSize, setSelectedSize] = useState<string | null>(size);

  const buttonSelected = (size: string) => {
    query.set("size", size);
    setSelectedSize(size);
  };

  const quan = query.get("quantity") ?? "";
  const [quantity, setQuantity] = useState<number>(Number(quan));

  const clickToast = () => {
    toast.default({
      text: "✨ @pheralb/toast",
      description: "✨ A beautiful toast library for React",
      variant: "error",
    });
  };

  // const quantity: any = getItemQuantity(data?.id);
  // const addToCart = () => {
  //   const newItem = {
  //     title: data.title,
  //     thumbnail: data.thumbnail,
  //     price: data.price,
  //     selectedSize: selectedSize,
  //     quantity: quantity,
  //     description: data.description,
  //     id: data.id,
  //     category: data.category,
  //   };
  //   setIsAddedToCart(!isAddedToCart);
  //   addItemToCart(newItem);
  // };

  return (
    <div className="flex flex-col md:flex-row gap-4 pageStyle  mb-28">
      <div className="border w-full md:w-1/2 flex gap-2 h-[460px] md:h-[640px]">
        <img
          src={product.imageUrl}
          alt={`${product.productName} Image`}
          className="w-full h-full border object-contain" //ml-auto
        />
      </div>

      <div className=" flex flex-col gap-4  w-full md:max-w-1/2 flex-1 ">
        <h1 className="text-xl font-serif tracking-wide">FASCO</h1>

        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">{product.productName}</h1>
          <Star />
        </div>

        <div>
          <h1 className="">{product.description}</h1>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-bold text-2xl">${product?.price}</p>

          <p className="opacity-50">${product?.price}</p>

          <span className="text-xs bg-red-600 p-2 text-white font-medium rounded-full">
            Save {product.stock}%
          </span>
        </div>
        {message && (
          <div className="w-full bg-pink-100 border border-pink-200 p-2 flex items-center justify-between rounded-md my-4">
            <p className="text-pink-400 text-xl font-serif">{message}</p>
          </div>
        )}
        <div className="w-full flex flex-col gap-2 my-4">
          <p>Only {product.stock} item[s] left in stock!</p>
          <Progress value={product.stock} className="w-full" />
        </div>

        <div className="">
          <p className="font-bold text-lg">size: {selectedSize}</p>
          <div className="flex gap-4 mt-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                onClick={() => buttonSelected(size)}
                className={`p-5 rounded cursor-pointer ${
                  selectedSize === size &&
                  "bg-black hover:bg-black/90 text-white hover:text-white"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="my-4">
          <p className="text-lg font-bold">color: Color</p>
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-6 bg-red-500 rounded-full"></div>
            <div className="h-6 w-6 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div>
          <p className="font-bold text-lg">Quantity</p>
          <div className="mt-2">
            <Button
              className="rounded-none cursor-pointer rounded-l-md p-6"
              variant="outline"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  query.set("quantity", String(quantity - 1));
                }
              }}
            >
              -
            </Button>
            <Button
              className="rounded-none cursor-pointer p-6"
              variant="outline"
            >
              {quantity}
            </Button>
            <Button
              className="rounded-none cursor-pointer rounded-r-md p-6"
              variant="outline"
              onClick={() => {
                setQuantity(quantity + 1);
                query.set("quantity", String(quantity + 1));
              }}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          {!isAddedToCart ? (
            <Button
              size={"icon"}
              className="flex items-center cursor-pointer justify-center w-full gap-8 py-6"
              onClick={clickToast}
            >
              <ShoppingBag className="" />
              <p className="text-lg">Add to cart</p>
            </Button>
          ) : (
            <Button className=" w-full">Open cart</Button>
          )}
        </div>

        <div className="mt-10 space-y-2">
          <div className="flex gap-4 opacity-50">
            <div className="text-xs flex items-center gap-2 cursor-pointer border border-neutral-200 hover:bg-neutral-100 w-max rounded-md p-2">
              <ShieldQuestion className="h-6 w-6" />
              <p>Ask a question</p>
            </div>

            <div className="text-xs flex items-center gap-2 cursor-pointer border border-neutral-200 hover:bg-neutral-100 w-max rounded-md p-2">
              <Share className="h-6 w-6" />
              <p>Share</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <Car className="h-7 w-7" />
            <p className="font-semibold text-lg">
              Estimated delivery time:{" "}
              <span className="font-normal text-base">{formatted}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ReceiptText className="h-7 w-7" />
            <p className="font-semibold text-lg">
              Free shipping and returns:{" "}
              <span className="font-normal text-base">
                On all orders over $70
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
