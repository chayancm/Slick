const { PrismaClient, activestatus } = require("@prisma/client");
const prisma = new PrismaClient();
const addCoupons = async (req, res) => {
  const { data } = req.body;
  try {
    const trx = await prisma.$transaction(
      await prisma.coupon.create({
        data: {
          type: data.type,
          publisherId: {
            connect: {
              id: data.publisherId,
            },
          },
          cashbackType: data.cashbackType,
          minOff: data.minOff,
          startDate: data.startDate,
          expirationTime: data.expirationTime,
          couponCode: data.couponCode,

          store: {
            connect: { storeid: data.storeid },
          },

          categories: {
            connect: data.category.map((category) => ({
              categoryId: category,
            })),
          },
        },
      })
    );
    await prisma.$transaction.commit();
    console.log("Coupon created and linked to categories successfully!");
  } catch (error) {
    console.error("Error creating coupon:", error);
    await prisma.$transaction.rollback();
  }
};
module.exports = {
  addCoupons,
};
