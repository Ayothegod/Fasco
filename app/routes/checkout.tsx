import { Form } from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Checkout() {
  return (
    <div className="pageStyle ">
      <section>
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
          Checkout
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
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="w-full md:w-[50%]">
          <div>
            <h2 className="text-2xl font-bold">Delivery</h2>
            <div>
              <Form>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Collections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country / Region</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Form>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] bg-neutral-300">
          <div>Checkout</div>
        </div>
      </div>
    </div>
  );
}
