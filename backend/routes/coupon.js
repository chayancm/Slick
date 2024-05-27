const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addCoupons,
  getAllCoupon,
  getCategoriesFromStore,
} = require("../controllers/manageCouponController");
const { verifyUser } = require("../middleware/verifyUser");
router.route("/categories/:storeName").get(getCategoriesFromStore);
router
  .route("/")
  .post([verifyUser, upload.single("imageUrl")], addCoupons)
  .get(verifyUser, getAllCoupon);

module.exports = router;
