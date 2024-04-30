const { PrismaClient, activestatus } = require("@prisma/client");
const prisma = new PrismaClient();
const addCoupons = async (req, res) => {
  const { data } = req.body;
  userId = req.user.id;
  try {
    const trx = await prisma.$transaction(
      await prisma.coupon.create({
        data: {
          type: data.type,
          publisherId: {
            connect: {
              id: userId,
            },
          },
          cashbackType: data.cashbackType,
          minOff: data.minOff,
          startDate: data.startDate,
          expirationTime: data.expirationTime,
          couponCode: data.couponCode,
          MerchantLink: data.MerchantLink,
          affiliateUrl: data.affiliateUrl,
          termsAndConditions: data.termsAndConditions,
          CouponPanchLine: data.CouponPanchLine,
          status:
            data.status === "ACTIVE"
              ? activestatus.ACTIVE
              : activestatus.INACTIVE,
          topOffer:
            data.topOffer === "ACTIVE"
              ? activestatus.ACTIVE
              : activestatus.INACTIVE,
          hotOfTheDay:
            data.hotOfTheDay === "ACTIVE"
              ? activestatus.ACTIVE
              : activestatus.INACTIVE,
          showWithCategory:
            data.showWithCategory === "ACTIVE"
              ? activestatus.ACTIVE
              : activestatus.INACTIVE,

          description: data.description,
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
