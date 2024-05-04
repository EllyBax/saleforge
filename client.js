import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* he
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
let userInput = "<script>alert('XSS');</script>";
let safeInput = escapeHtml(userInput);
console.log(safeInput); // Outputs: &lt;script&gt;alert('XSS');&lt;/script&gt;
*/
async function fetchLatestSale(business_id, product_name) {
  // Find the latest sale for the given business_id and product_name
  return await prisma.sales.findFirst({
    where: {
      businessId: business_id,
      product: product_name,
    },
    orderBy: {
      id: "desc", // Order by the creation date in descending order to get the latest sale
    },
  });
}

let latestSale = await fetchLatestSale(1, "Sembe");
console.log(latestSale);
