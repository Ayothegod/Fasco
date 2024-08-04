import { Link, useRouteLoaderData } from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { cartStore } from "~/lib/store";

export default function Cart() {
  const data = useRouteLoaderData("root");
  console.log(data);

  const { cart, decreaseQuantity, increaseQuantity, getTotalCost } =
    cartStore();

  return (
    <div className="pageStyle">
      <section className="pageStyle ">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
          Shopping Cart
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
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="mt-10 divide-y-2">
        <div className="flex items-center justify-between pb-2">
          <p className="font-bold text-sm">Product</p>
          <p className="hidden sm:block font-bold text-sm">Total</p>
        </div>
        <div className="flex flex-col  justify-between py-4">
          <div className="w-full flex flex-col gap-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between border w-full rounded-md px-1"
              >
                <div className="flex flex-col sm:items-center sm:flex-row gap-4 w-full ">
                  <img
                    src={item.thumbnail}
                    alt={`image-${item.id}`}
                    className="h-48 sm:h-36 object-cover object-top "
                  />
                  <div className="p-2 space-y-2 ">
                    <h2 className="font-bold text-xl">{item.title}</h2>
                    <div className="flex items-center justify-between w-full sm:gap-20 ">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">${item.price}</p>
                        <p className="flex items-center gap-2">
                          size: <Button>{item.selectedSize}</Button>
                        </p>
                      </div>

                      <div className="mt-2 md:mt-4 flex ">
                        <Button
                          className="rounded-none rounded-l-md"
                          variant="outline"
                          onClick={() => decreaseQuantity(item?.id)}
                        >
                          -
                        </Button>
                        <Button className="rounded-none" variant="outline">
                          {item?.quantity}
                        </Button>
                        <Button
                          className="rounded-none rounded-r-md "
                          variant="outline"
                          onClick={() => increaseQuantity(item?.id)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="sm:hidden">
                      <p className="font-medium text-sm text-center mt-4">
                        Total: ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex">
                  <p className="font-bold text-center mt-4">
                    Total: ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:justify-end sm:items-end gap-4">
            <div className="flex items-center justify-between gap-20">
              <p className=" font-bold">Subtotal</p>
              <p className="font-bold">${getTotalCost().toFixed(2)}</p>
            </div>

            <Link to="/checkout">
              <Button className="w-full sm:w-max sm:px-20">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
