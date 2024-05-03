const { PrismaClient, activestatus } = require("@prisma/client");
const prisma = new PrismaClient();
const getAllCoupon = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      include: {
        store: {
          select: { storeName: true },
        },
        category: {
          select: { categoryName: true },
        },
      },
    });

    res.status(200).send({ coupons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCoupon = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Bad Request: categoryName header is missing");
  }

  try {
    const store = await prisma.store.findUnique({
      where: {
        storeid: id,
      },
    });

    if (!store) {
      return res.status(404).json({ message: "No store found with this name" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const addCoupons = async (req, res) => {
  const { data } = req.body;
  userId = req.id;
  try {
    await prisma.coupon.create({
      data: {
        type: data.type,
        publisherName: data.publisherName,
        publisher: {
          connect: {
            id: userId,
          },
        },
        cashbackType: data.cashbackType,
        minOff: data.minOff,
        imageUrl: data.imageUrl,
        startDate: data.startDate,
        expirationTime: data.expirationTime,
        couponCode: data.couponCode,
        MerchantLink: data.MerchantLink,
        affiliateUrl: data.affiliateUrl,
        termsAndConditions: data.termsAndConditions,
        CouponPunchLine: data.CouponPunchLine,
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

        category: {
          connect: data.category.map((category) => ({
            categoryId: category,
          })),
        },
      },
    });

    console.log("Coupon created and linked to categories successfully!");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating coupon:", error);
    await prisma.$transaction.rollback();
  }
};
module.exports = {
  addCoupons,
  getAllCoupon,
};
