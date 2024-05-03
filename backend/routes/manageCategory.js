const express = require("express");
const router = express.Router();
const { verifyEditor } = require("../middleware/verifyEditor");
const {
  addCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/manageCategoryController");

router
  .route("/")
  .get(verifyEditor, getAllCategory)
  .post(verifyEditor, addCategory);
router
  .route("/:id")
  .get(verifyEditor, getCategory)
  .patch(verifyEditor, updateCategory)
  .delete(verifyEditor, deleteCategory);

module.exports = router;
