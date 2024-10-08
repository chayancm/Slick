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
router.route("/").post(verifyUser, addCoupons).get(getAllCoupon);

module.exports = router;
