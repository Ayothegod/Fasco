import { useState } from "react";
import { tabsTrigger } from "../../lib/database";
import femaleFashion from "~/assets/fascoAsset/Images.png";
import female2Png from "~/assets/fascoAsset/Rectangle 19280 (1).png";
import female1Png from "~/assets/fascoAsset/Rectangle 19280.png";
import maleSvg from "~/assets/fascoAsset/image 2.svg";
import femaleSvg from "~/assets/fascoAsset/image 3.svg";
// import femaleSvg from "../fascoAsset/image 3.svg";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link } from "@remix-run/react";

export default function NewArrivals() {
  return (
    <main className="pageStyle mt-8 mb-16 overflow-x-hidden">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-serif font-bold tracking-wide">
          New Arrivals
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          delectus vel dolor in ex nobis sint itaque vitae, minus saepe?
        </p>
      </div>

      <Tabs defaultValue="men-fashion" className="mt-8">
        <TabsList className="flex items-center justify-between overflow-x-scroll sm:overflow-x-hidden bg-white">
          {tabsTrigger.map((tab, index) => (
            <TabsTrigger
              value={tab.value}
              className={`w-full relative data-[state=active]:bg-black data-[state=active]:text-white`}
              key={index}
            >
              {tab.text}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <TabsContent value="men-fashion">
            <p>Hello men-fashion</p>
          </TabsContent>
          <TabsContent value="women-fashion">
            <p>Hello women-fashion</p>
          </TabsContent>
          <TabsContent value="women-accessories">
            <p>Hello women-accessories</p>
          </TabsContent>
          <TabsContent value="men-accessories">
            <p>Hello men-accessories</p>
          </TabsContent>
          <TabsContent value="discount">
            <p>Hello discount</p>
          </TabsContent>
        </div>
      </Tabs>
      <div className="mt-8 flex items-center justify-center ">
        <Link to="/shop">
          <Button className="w-full sm:w-fit sm:px-8">View More</Button>
        </Link>
      </div>
    </main>
  );
}
