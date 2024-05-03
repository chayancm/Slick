const { error } = require("console");
const { PrismaClient, activestatus } = require("@prisma/client");
const { ok } = require("assert");
const { addCategory } = require("./manageCategoryController");
const prisma = new PrismaClient();
const getAllStore = async (req, res) => {
  try {
    let stores;
    if (req.role.includes("ADMIN") || req.role.includes("EDITOR")) {
      // Fetch all stores
      stores = await prisma.store.findMany();
    } else {
      // Fetch stores only for the current user
      stores = await prisma.store.findMany({
        where: { merchantId: req.user.id },
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

const addStore = async (req, res) => {
  const { data } = req.body;
  try {
    await prisma.store.create({
      data: {
        storeName: data.storeName,
        storeAlternateName: data.storeAlternateName,
        storeUrl: data.storeUrl,
        storeLogo: data.storeLogo,
        TrackingLink: data.TrackingLink,
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
        merchant: { connect: { id: req.merchant } },
        // categories: {
        //   connect: data.categories.map((categoryId) => ({ id: categoryId })),
        // },
      },
    });
    console.log("here");
    return res.status(200).json({ message: "Store Created" });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("storeName")) {
      return res
        .status(400)
        .json({ error: "Store with this name already exists." });
    } else {
      console.error("Error adding store:", error);
    }
  }
};

const updateStore = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = req.body;
  id = req.user.id;
  console.log(data);

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

    const updatedStore = await prisma.store.update({
      where: {
        storeid: id,
      },
      data: {
        storeName: data.storeName,
        storeAlternateName: data.storeAlternateName,
        storeUrl: data.storeUrl,
        storeLogo: data.storeLogo,
        TrackingLink: data.TrackingLink,
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
          connect: data.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });

    if (!updatedStore) {
      return res.status(404).json({ message: "Failed to update Store" });
    }

    return res
      .status(200)
      .json({ message: "Store updated successfully", updatedStore });
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
    const updatedStore = await prisma.$transaction(async (prisma) => {
      const store = await prisma.store.update({
        where: { id: storeId },
        data: {
          categories: {
            connect: categoryIds.map((categoryId) => ({ id: categoryId })),
          },
        },
        include: { categories: true },
      });

      return store;
    });

    return updatedStore;
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
        storeid: true,
        storeName: true,
      },
    });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
};
