const express = require("express");
const router = express.Router();
const {
  addCoupons,
  getAllCoupon,
} = require("../controllers/manageCouponController");
const { verifyUser } = require("../middleware/verifyUser");
router.route("/").post(verifyUser, addCoupons).get(verifyUser, getAllCoupon);

module.exports = router;
