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
  const data = req.body;
  const userId = req.id;
  try {
    const store = await prisma.store.findUnique({
      where: {
        storeName: data.store,
      },
      select: {
        merchantId: true,
      },
    });

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    const imageUrl = req.file ? req.file.path : "photo";
    const category = JSON.parse(data.category);

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
        AggregatorType: data.AggregatorType,
        minOff: parseInt(data.minOff, 10),
        startDate: new Date(data.startDate),
        expirationTime: new Date(data.expiryDate),
        couponCode: data.couponCode,
        MerchantLink: data.merchantLink,
        affiliateUrl: data.affiliateUrl,
        termsAndConditions: data.termsAndConditions,
        CouponPunchLine: data.couponPunchline,
        status: data.status === "ACTIVE" ? "ACTIVE" : "INACTIVE",
        topOffer: data.topOffer === "ACTIVE" ? "ACTIVE" : "INACTIVE",
        hotOfTheDay: data.hotOfTheDay === "ACTIVE" ? "ACTIVE" : "INACTIVE",
        showWithCategory:
          data.showWithCategory === "ACTIVE" ? "ACTIVE" : "INACTIVE",
        description: data.description,
        store: {
          connect: { merchantId: store.merchantId },
        },
        category: {
          connect: category.map((categoryname) => ({
            categoryName: categoryname,
          })),
        },
      },
    });

    console.log("Coupon created and linked to categories successfully!");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoriesFromStore = async (req, res) => {
  console.log("here i am");
  console.log(req.params);
  const { storeName } = req.params;
  console.log(storeName);
  try {
    const store = await prisma.store.findUnique({
      where: { storeName: storeName },
      include: { categories: true },
    });

    console.log(store.categories);
    const categories = store.categories.map((category) => {
      return category.categoryName;
    });
    res.status(200).json({ categories });
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }

  console.log("here");
};
module.exports = {
  addCoupons,
  getAllCoupon,
  getCategoriesFromStore,
};
