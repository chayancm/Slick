const express = require("express");
const router = express.Router();
const { verifyEditor } = require("../middleware/verifyEditor");
const {
  addStore,
  updateStore,
  getAllStore,
  getStore,
  deleteStore,
} = require("../controllers/storeController");
const { verifyMerchant } = require("../middleware/verifyMerchant");
const { authorizeStoreEdit } = require("../middleware/authorizeStore");

router
  .route("/")
  .get(verifyMerchant, getAllStore)
  .post(verifyMerchant, addStore);
router
  .route("/:id")
  .get(verifyMerchant, getStore)
  .patch([verifyMerchant, authorizeStoreEdit], updateStore)
  .delete([verifyMerchant, authorizeStoreEdit], deleteStore);

module.exports = router;
