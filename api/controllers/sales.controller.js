// salesController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SalesController {
  async saleEntry(saleDetails) {
    return await prisma.sales.create({
      data: saleDetails,
    });
  }

  async fetchLatestSale(business_id, product_name) {
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

  async saleDeletion(latestSale) {
    await prisma.sales.delete({
      where: {
        id: latestSale.id,
      },
    });
  }

  async saleUpdate(saleId, newItem, newQuantity, newPrice) {
    //needs modification
    return await prisma.sales.update({
      where: {
        id: saleId,
      },
      data: {
        product: newItem,
        quantity: newQuantity,
        price: newPrice,
      },
    });
  }

  async fetchSalesByUserId(business_id) {
    return await prisma.sales.findMany({
      where: {
        businessId: business_id,
      },
      orderBy: {
        id: "desc",
      },
      select: { product: true, price: true, quantity: true },
      take: 5,
    });
  }

  async fetchSalesByFilter(filter) {
    return await prisma.sales.findMany({
      where: filter,
      orderBy: {
        id: "desc",
      },
      select: {
        product: true,
        quantity: true,
        price: true,
        createdAt: true,
      },
    });
  }
  // Add other methods as needed
}

export default new SalesController();
