import { Button } from "../ui/button";


export default function Filters() {
  return (
    <section className="space-y-6 mt-8">
      <div className="space-y-2">
        <h4 className="text-xs font-serif font-bold tracking-wide">Size</h4>
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
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-serif font-bold tracking-wide">Prices</h4>
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
        <h4 className="text-xs font-serif font-bold tracking-wide">Tags</h4>
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
  );
}
