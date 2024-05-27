const express = require("express");
const router = express.Router();
const { verifyEditor } = require("../middleware/verifyEditor");
const { verifyUser } = require("../middleware/verifyUser");
const {
  addCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/manageCategoryController");
const upload = require("../middleware/multer");
router
  .route("/")
  .get(verifyUser, getAllCategory)
  .post([verifyEditor, upload.single("imageUrl")], addCategory);
router
  .route("/:id")
  .get(verifyEditor, getCategory)
  .patch(verifyEditor, updateCategory)
  .delete(verifyEditor, deleteCategory);

module.exports = router;
