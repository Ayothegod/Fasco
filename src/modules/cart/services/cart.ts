import { atom } from "nanostores";

// export const count = atom(0);

export const cart = atom<string[]>(["hello", "what"]);

export const addToCart = (item: string) => {
  cart.set([...cart.get(), item]);
};
