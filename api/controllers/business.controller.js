import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BusinessController {
  async createBusiness(businessDetails) {
    return await prisma.business.create({
      data: businessDetails,
    });
  }

  async getBusinessByUserId(user_id) {
    return await prisma.business.findFirst({
      where: {
        userId: user_id,
      },
      select: { id: true, name: true },
    });
  }
}

export default new BusinessController();
