import image1 from "~/assets/fascoAsset/image (4).png";
import image2 from "~/assets/fascoAsset/image (5).png";
import image3 from "~/assets/fascoAsset/image (6).png";
import image4 from "~/assets/fascoAsset/image (7).png";
import image5 from "~/assets/fascoAsset/image (8).png";
import image6 from "~/assets/fascoAsset/image (9).png";
import image7 from "~/assets/fascoAsset/image (10).png";
import { Contact, Search, ShoppingBag, Star } from "lucide-react";

export const loggedInIcons = [
  { icon: Search },
  { icon: Contact },
  { icon: Star },
  { icon: ShoppingBag },
];

export const navLink = [
  { name: "Home", href: "/", withUser: true },
  { name: "Shop", href: "/shop", withUser: true },
  { name: "Products", href: "/products", withUser: true },
  { name: "pages", href: "#", withUser: true },
  { name: "Home", href: "#/", withUser: false },
  { name: "Deals", href: "#deals", withUser: false },
  { name: "New Arrivals", href: "#new-arrivals", withUser: false },
  { name: "Packages", href: "#packages", withUser: false },
  { name: "Sign in", withUser: false },
];

export const imageNumbers = [1, 2, 3, 4, 5, 6];

export const imageCarouselArray = [
  { src: image1, alt: "first-image" },
  { src: image2, alt: "second-image" },
  { src: image3, alt: "third-image" },
  { src: image4, alt: "fourth-image" },
  { src: image5, alt: "fifth-image" },
  { src: image6, alt: "sixth-image" },
  { src: image7, alt: "seventh-image" },
];

export const tabsTrigger = [
  { value: "men-fashion", text: "Men's Fashion" },
  { value: "women-fashion", text: "Women's Fashion" },
  { value: "women-accessories", text: "Women Accessories" },
  { value: "men-accessories", text: "Men Accessories" },
  { value: "discount", text: "Discount Deals" },
];
