export function getStockMessage(stock: number): string | null {
  if (stock <= 0) return "Out of stock";
  if (stock <= 10) return `🔥 Only ${stock} left! Hurry!`;
  if (stock <= 20) return `⚠️ Just ${stock} left in stock`;
  if (stock <= 30) return `There's still ${stock} left in stock`;
  return `ℹ️ ${stock} items left`;
  // if ([5, 10, 20, 30, 50].includes(stock)) {
  // }
  // return null;
}
