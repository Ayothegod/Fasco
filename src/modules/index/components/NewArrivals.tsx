import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { tabsTrigger } from "../services/indexUtils";

export default function NewArrivals() {
  return (
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
  );
}
