const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/verifyAdmin");
const user = require("../controllers/userController");
router.get("/", verifyAdmin, user.getAllUser);
router.patch("/:id", verifyAdmin, user.editUser);

module.exports = router;
