export default function formatPriceAsTZS(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
  }).format(price);
}
