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

export default function NewArrivals({ male, female }: any) {
  // console.log(male, female);

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleButtonClick = (index: any) => {
    setSelectedButtonIndex(index);
  };

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

      <Tabs defaultValue="men-fashion" className="mt-4">
        <TabsList className="flex items-center justify-between overflow-x-scroll sm:overflow-x-hidden bg-neutral-800">
          {tabsTrigger.map((tab, index) => (
            <TabsTrigger
              value={tab.value}
              className={`w-full relative ${
                selectedButtonIndex == index && "bg-black"
              }`}
              key={index}
              onClick={() => handleButtonClick(index)}
            >
              {tab.text}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <TabsContent value="men-fashion">
            <div className="p-10 border">
              {male &&
                male.documents.map((data: any) => (
                  <div key={data.id}>
                    <p>{data.title}</p>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="women-fashion">
            <div className="p-1 border">
              {female &&
                female.documents.map((data: any) => (
                  <div key={data.id}>
                    <p>{data.title}</p>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="women-accessories">
            <img
              src={female2Png}
              alt="image@svg"
              className="h-48 w-48 object-cover"
            />
          </TabsContent>
          <TabsContent value="men-accessories">
            <img
              src={maleSvg}
              alt="image@svg"
              className="h-48 w-48 object-cover object-top"
            />
          </TabsContent>
          <TabsContent value="discount">
            {" "}
            <img
              src={female1Png}
              alt="image@svg"
              className="h-48 w-48 object-cover"
            />
          </TabsContent>
        </div>
      </Tabs>
      <div className="mt-8 flex items-center justify-center ">
        <Button className="w-full sm:w-fit sm:px-8">View More</Button>
      </div>

      {/* <div>
        {imageNumbers.map((image, index) => (
          <img
            key={index}
            src={`https://picsum.photos/200/200?id=1&format=png`}
            alt="image alts"
          />
        ))}
      </div> */}
    </main>
  );
}
