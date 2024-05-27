const express = require("express");
const router = express.Router();
const {
  addStore,
  updateStore,
  getAllStore,
  getStore,
  deleteStore,
  getNameOfStore,
  getAllCategory,
} = require("../controllers/manageStoreController");
const { verifyMerchant } = require("../middleware/verifyMerchant");
const { authorizeStore } = require("../middleware/authorizeStore");
const upload = require("../middleware/multer");

router.route("/categories").get(getAllCategory);
router
  .route("/")
  .get(verifyMerchant, getAllStore)
  .post([verifyMerchant, upload.single("storeLogo")], addStore);
router.route("/name").get(getNameOfStore);
router
  .route("/:id")
  .get(verifyMerchant, getStore)
  .patch([verifyMerchant, authorizeStore], updateStore)
  .delete([verifyMerchant, authorizeStore], deleteStore);

module.exports = router;
