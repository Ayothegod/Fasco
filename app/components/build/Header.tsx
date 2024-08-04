import { Suspense } from "react";
import { navLink, loggedInIcons, noUserNavLink } from "../../lib/database";
import { Button } from "../ui/button";
import IsAuthPage from "../utils/IsAuthPage";
import { IsLoggedIn } from "../utils/IsLoggedIn";
import { Await, Link } from "@remix-run/react";
import { AlignRight, Search, ShoppingBag, Star, User } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { cartStore, stateStore } from "~/lib/store";

export default function Header({ user }: any) {
  const { cart, decreaseQuantity, increaseQuantity, clearCart } = cartStore();
  const { openCartSidebar, setOpenCartSidebar } = stateStore();
  return (
    <>
      <header className="pageStyle flex items-center justify-between py-6">
        <IsLoggedIn>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide">
            FASCO
          </h1>
        </IsLoggedIn>

        <IsAuthPage className="contents">
          <ul className="hidden md:flex items-center gap-8">
            {user ? (
              navLink.map((link, idx) => (
                <p key={idx} className="text-sm md:text-base">
                  {user && link.withUser && <a href={link.href}>{link.name}</a>}
                  {!user && !link.withUser && (
                    <a href={link.href}>{link.name}</a>
                  )}
                </p>
              ))
            ) : (
              <div className="contents">
                {noUserNavLink.map((data, idx) => (
                  <p key={idx} className="text-sm md:text-base">
                    <a href={data.href}>{data.name}</a>
                  </p>
                ))}
              </div>
            )}
          </ul>

          {user && (
            <div className="flex items-center gap-4">
              <div className=" p-2">
                <Search className="cursor-pointer" />
              </div>
              <div className=" p-2">
                <User className="cursor-pointer" />
              </div>
              <div className=" p-2">
                <Star className="cursor-pointer" />
              </div>

              <Sheet open={openCartSidebar} onOpenChange={setOpenCartSidebar}>
                <SheetTrigger asChild>
                  <div className="relative">
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
                      Buy <span className="text-neutral-800">${}</span> more and
                      get{" "}
                      <span className="font-bold text-neutral-800">
                        Free shipping
                      </span>
                    </SheetDescription>
                  </SheetHeader>

                  <div className="grid gap-4 py-4 overflow-y-auto">
                    {cart.length < 1 ? (
                      <div className="flex items-center justify-center mt-10">
                        <Label className="text-center">
                          No items in your cart
                        </Label>
                      </div>
                    ) : (
                      <>
                        {cart.map((item: any, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-1"
                          >
                            <div className=" w-[50%] md:w-[40%]">
                              <img
                                src={item.thumbnail}
                                alt={`image-${item.id}`}
                                className="w-full h-full"
                              />
                            </div>
                            <div className="">
                              <h3 className="text-sm font-bold">
                                {item.title}
                              </h3>
                              <Label>${item.price}</Label>

                              <div className="mt-2 md:mt-4 flex ">
                                <Button
                                  className="rounded-none rounded-l-md"
                                  variant="outline"
                                  onClick={() => decreaseQuantity(item?.id)}
                                >
                                  -
                                </Button>
                                <Button
                                  className="rounded-none"
                                  variant="outline"
                                >
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

                              <div>
                                {parseFloat((item.price * 3).toFixed(2))}
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button variant="link" onClick={clearCart}>
                          Clear cart
                        </Button>
                      </>
                    )}
                  </div>

                  <SheetFooter className="mt-auto">
                    <div className="flex flex-col w-full divide-y-2">
                      <div className="flex items-center justify-between text-sm pb-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="fast-shipping" />
                          <Label htmlFor="fast-shipping">
                            fast shipping package
                          </Label>
                        </div>
                        <span>$10.00</span>
                      </div>

                      <div className="w-full flex flex-col gap-2 pt-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">Subtotal</p>
                          <span className="font-medium text-sm">
                            ${"amount"}
                          </span>
                        </div>
                        <SheetClose asChild>
                          <Link to="/checkout">
                            <Button type="submit" className="w-full">
                              Checkout now
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            to="/cart"
                            className="underline text-center text-sm"
                          >
                            View Cart
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <div className="md:hidden cursor-pointer">
                <AlignRight className="h-8 w-8" />
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">Fasco</SheetTitle>
              </SheetHeader>
              <div>
                <ul className=" md:hidden">
                  {user &&
                    navLink.map((link, idx) => (
                      <p key={idx} className="text-sm md:text-base">
                        {user && link.withUser && (
                          <a href={link.href}>{link.name}</a>
                        )}
                        {!user && !link.withUser && (
                          <a href={link.href}>{link.name}</a>
                        )}
                      </p>
                    ))}
                  {!user &&
                    noUserNavLink.map((link, idx) => (
                      <p key={idx} className="text-sm md:text-base">
                        <p>TOP</p>
                      </p>
                    ))}
                </ul>
              </div>

              {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </IsAuthPage>
      </header>
    </>
  );
}

// {/* {loggedInIcons.map((icon, id) => (
//   <div key={id}>{user ? <icon.icon /> : null}</div>
// ))} */}
