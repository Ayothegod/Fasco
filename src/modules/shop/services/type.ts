export type Product = {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  category: string;
  color: string;
  createdAt: Date;
  currency: "USD";
  description: string;
  gender: string;
  imageUrl: string;
  price: number;
  productName: string;
  season: string;
  sizes: string[];
  slug: {
    _type: string;
    current: string;
  };
  stock: number;
  subCategory: string;
  tag: string;
  updatedAt: Date;
  usage: string;
  year: number;
};
