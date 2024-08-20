const { error } = require("console");
const { PrismaClient, activestatus } = require("@prisma/client");
const { ok } = require("assert");
const { addCategory } = require("./manageCategoryController");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const getAllStore = async (req, res) => {
  try {
    let stores;
    if (req.role.includes("ADMIN") || req.role.includes("EDITOR")) {
      stores = await prisma.store.findMany({
        include: {
          categories: true,
        },
      });
    } else {
      
      stores = await prisma.store.findMany({
        where: { merchantId: req.user.id },
        include: {
          categories: true,
        },
      });
    }

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStore = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Bad Request: store id in header is missing");
  }

  try {
    const store = await prisma.store.findUnique({
      where: {
        storeid: id,
      },
      include: {
        categories: {
          select: {
            categoryName: true,
          },
        },
      },
    });
    if (!store) {
      return res.status(404).json({ message: "No store found with this name" });
    }

    return res.status(200).json({ store });
  } catch (error) {
    console.error("Error fetching Store:", error);
    return res.status(500).send("Internal Server Error");
  }
};
const merchantIdCheck = async (req, res) => {
  const found = await prisma.store.findUnique({
    where: {
      merchantId: parseInt(req.params.merchantId, 10),
    },
  });
  if (found === null) {
    return res.status(200).send("available");
  } else {
    return res.status(403).send("allready exist");
  }
};

const addStore = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const storeLogo = req.file ? req.file.path : "photo";
  const categoriesArray = data.checkedItems.map((category) => category.trim());
  if (data.merchantId === "") {
    const uuid = uuidv4();
    let isUnique = false;
    while (!isUnique) {
      const numericPart = uuid.replace(/-/g, "").slice(0, 12);
      const decimalId = parseInt(numericPart, 16) % 1000000;
      const foundId = await prisma.store.findUnique({
        where: {
          merchantId: decimalId,
        },
      });
      if (foundId == null) {
        isUnique = true;
        data.merchantId = decimalId;
      }
    }
  }
  const foundCategories = await prisma.category.findMany({
    where: {
      categoryName: { in: categoriesArray },
    },
    select: { categoryId: true },
  });
  try {
    await prisma.store.create({
      data: {
        storeName: data.storeName,
        storeAlternateName: data.storeAlternateName,
        storeUrl: data.storeUrl,
        storeLogo: storeLogo,
        TrackingLink: data.trackingLink,
        storeDomainName: data.storeDomainName,
        utmParameter: data.utmParameter,
        status:
          data.status === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnMenu:
          data.displayOnMenu === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnNotificaton:
          data.displayOnNotificaton === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        topStore:
          data.topStore === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        topStoreInFooter:
          data.topStoreInFooter === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        storeDescription: data.storeDescription,
        metaTitle: data.metaTitle,
        metaKeyword: data.metaKeyword,
        metaCanonical: data.metaCanonical,
        metaSchema: data.metaSchema,
        metaDescription: data.metaDescription,
        merchantId: parseInt(data.merchantId, 10),
        createdBy: { connect: { id: req.createdById } },
        categories: {
          connect: foundCategories.map((category) => ({
            categoryId: category.categoryId,
          })),
        },
      },
    });
    console.log("here");
    res.status(200).json({ message: "Store Created" });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002" && error.meta?.target?.includes("storeName")) {
      return res.status(400).send("Store with this name already exists.");
    } else {
      console.error("Error adding store:", error);
    }
  }
};

const updateStore = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const existingStore = await prisma.store.findUnique({
      where: {
        storeid: id,
      },
    });

    if (existingStore == null) {
      return res
        .status(404)
        .json({ message: `Category with name ${id} not found` });
    }
    const categoriesArray = data.checkedItems.map((category) =>
      category.trim()
    );
    const foundCategories = await prisma.category.findMany({
      where: {
        categoryName: { in: categoriesArray },
      },
      select: { categoryId: true },
    });
    const updatedStore = await prisma.store.update({
      where: {
        storeid: id,
      },
      data: {
        storeName: data.storeName,
        storeAlternateName: data.storeAlternateName,
        storeUrl: data.storeUrl,
        TrackingLink: data.trackingLink,
        storeDomainName: data.storeDomainName,
        utmParameter: data.utmParameter,
        status:
          data.status === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnMenu:
          data.displayOnMenu === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnNotificaton:
          data.displayOnNotificaton === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        topStore:
          data.topStore === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        topStoreInFooter:
          data.topStoreInFooter === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        storeDescription: data.storeDescription,
        metaTitle: data.metaTitle,
        metaKeyword: data.metaKeyword,
        metaCanonical: data.metaCanonical,
        metaSchema: data.metaSchema,
        metaDescription: data.metaDescription,
        categories: {
          connect: foundCategories.map((category) => ({
            categoryId: category.categoryId,
          })),
        },
      },
    });

    if (!updatedStore) {
      return res.status(404).json({ message: "Failed to update Store" });
    }

    return res.status(200).json({ message: "Store updated successfully" });
  } catch (error) {
    console.error("Error updating Store:", error);
    return res.status(500).json({ error: "Failed to update Store" });
  }
};

const deleteStore = async (req, res) => {
  const { id } = req.params; // Extract StoreName from req.params

  try {
    const deletedStore = await prisma.store.delete({
      where: {
        storeid: id,
      },
    });

    if (!deletedStore) {
      throw new Error(`Store' not found`);
    }

    res.status(200).send("deleted");
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error(`store' not found`);
    } else {
      console.log(error);
    }
  }
};
const addCategorytoStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { categoryIds } = req.body;

    const store = await prisma.store.update({
      where: { id: storeId },
      data: {
        categories: {
          connect: categoryIds.map((categoryId) => ({ id: categoryId })),
        },
      },
      include: { categories: true },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding categories to store:", error);

    throw error;
  }
};
const getNameOfStore = async (req, res) => {
  let stores;
  try {
    stores = await prisma.store.findMany({
      select: {
        storeName: true,
      },
    });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        categoryName: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
module.exports = {
  addStore,
  updateStore,
  getAllStore,
  getStore,
  deleteStore,
  addCategorytoStore,
  getNameOfStore,
  getAllCategory,
  merchantIdCheck,
};
