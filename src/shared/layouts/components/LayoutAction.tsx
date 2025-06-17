// import type { User } from "@prisma/client";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Search, ShoppingBag, Star, User } from "lucide-react";

export default function LayoutAction({ user }: any) {
  // console.log(user);
  const cart: any[] = [];

  return (
    <>
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className=" p-2">
            <Search className="cursor-pointer" />
          </div>
          <div className=" p-2">
            <User className="cursor-pointer" />
          </div>
          <div className=" p-2">
            <Star className="cursor-pointer" />
          </div>

          {/* <Sheet open={openCartSidebar} onOpenChange={setOpenCartSidebar}> */}
          <Sheet>
            <SheetTrigger asChild>
              <div className="relative mr-2">
                <ShoppingBag className="cursor-pointer" />
                <div className="absolute -top-2 -right-2 rounded-full h-5 w-5 bg-red-600 flex items-center justify-center">
                  <span className="text-xs text-white">{cart.length}</span>
                </div>
              </div>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  Buy <span className="text-neutral-800">${}</span> more and get{" "}
                  <span className="font-bold text-neutral-800">
                    Free shipping
                  </span>
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4 overflow-y-auto">
                {cart.length < 1 ? (
                  <div className="flex items-center justify-center mt-10">
                    <Label className="text-center">No items in your cart</Label>
                  </div>
                ) : (
                  <>
                    {cart.map((item: any, index) => (
                      <div key={item.id} className="flex items-center gap-1">
                        <div className=" w-[50%] md:w-[40%]">
                          <img
                            src={item.thumbnail}
                            alt={`image-${item.id}`}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="">
                          <h3 className="text-sm font-bold">{item.title}</h3>
                          <Label>${item.price}</Label>

                          <div className="mt-2 md:mt-4 flex ">
                            <Button
                              className="rounded-none rounded-l-md"
                              variant="outline"
                              // onClick={() => decreaseQuantity(item?.id)}
                            >
                              -
                            </Button>
                            <Button className="rounded-none" variant="outline">
                              {item?.quantity}
                            </Button>
                            <Button
                              className="rounded-none rounded-r-md "
                              variant="outline"
                              // onClick={() => increaseQuantity(item?.id)}
                            >
                              +
                            </Button>
                          </div>

                          <div>
                            {parseFloat(
                              (item.quantity * item.price).toFixed(2)
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <Button variant="link" onClick={clearCart}>
                      Clear cart
                    </Button> */}
                    Clear cart
                  </>
                )}
              </div>

              <SheetFooter className="mt-auto">
                <div className="flex flex-col w-full divide-y-2">
                  {/* <div className="flex items-center justify-between text-sm pb-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="fast-shipping" />
                          <Label htmlFor="fast-shipping">
                            fast shipping package
                          </Label>
                        </div>
                        <span>$10.00</span>
                      </div> */}

                  <div className="w-full flex flex-col gap-2 pt-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Subtotal</p>
                      <span className="font-medium text-sm">
                        {/* ${getTotalCost().toFixed(2)} */}
                      </span>
                    </div>
                    <SheetClose asChild>
                      <a href="/checkout">
                        <Button type="submit" className="w-full">
                          Checkout now
                        </Button>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="/cart" className="underline text-center text-sm">
                        View Cart
                      </a>
                    </SheetClose>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
