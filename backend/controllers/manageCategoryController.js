const { error } = require("console");
const { PrismaClient, activestatus } = require("@prisma/client");
const { ok } = require("assert");
const prisma = new PrismaClient();
const getAllCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories, count: categories.length });
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Bad Request: categoryName header is missing");
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        categoryId: id,
      },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found with this name" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const addCategory = async (req, res) => {
  console.log(req.body);
  const data = req.body;

  try {
    const Category = await prisma.category.create({
      data: {
        categoryName: data.categoryName,
        categoryUrl: data.categoryUrl,
        imageUrl: data.imageUrl,
        status:
          data.status === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnHome:
          data.displayOnHome === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnHomecoupons:
          data.displayOnHomecoupons === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnFooter:
          data.displayOnFooter === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        metaTitle: data.metaTitle,
        metaKeyword: data.metaKeyword,
        metaCanonical: data.metaCanonical,
        metaSchema: data.metaSchema,
        metaDescription: data.metaDescription,
      },
    });
    return res.status(200).json({ Category });
  } catch (error) {
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("categoryName")
    ) {
      return res
        .status(400)
        .json({ error: "Category with this name already exists." });
    } else {
      console.error("Error adding category:", error);
    }
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = req.body;
  console.log(data);

  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        categoryId: id,
      },
    });

    // if (existingCategory == null) {
    //   return res
    //     .status(404)
    //     .json({ message: `Category with name ${categoryId} not found` });
    // }

    const updatedCategory = await prisma.category.update({
      where: {
        categoryId: id,
      },
      data: {
        categoryName: data.categoryName,
        categoryUrl: data.categoryUrl,
        imageUrl: data.imageUrl,
        status:
          data.status === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnHome:
          data.displayOnHome === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnHomecoupons:
          data.displayOnHomecoupons === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        displayOnFooter:
          data.displayOnFooter === "ACTIVE"
            ? activestatus.ACTIVE
            : activestatus.INACTIVE,
        metaTitle: data.metaTitle,
        metaKeyword: data.metaKeyword,
        metaCanonical: data.metaCanonical,
        metaSchema: data.metaSchema,
        metaDescription: data.metaDescription,
      },
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Failed to update category" });
    }

    return res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params; // Extract categoryName from req.params

  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        categoryId: id,
      },
    });

    if (!deletedCategory) {
      throw new Error(`Category with name ' not found`);
    }

    res.status(200).send("deleted");
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error(`Category with name ' not found`);
    } else {
      throw error;
    }
  }
};

module.exports = {
  addCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
};
