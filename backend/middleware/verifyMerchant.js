const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const verifyMerchant = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.sendStatus(401);
          }
          return res.sendStatus(403);
        }
        req.user = decoded.username;
        req.email = decoded.email;
        const user = await prisma.user.findUnique({
          where: {
            email: req.email,
          },
          include: {
            roles: true,
          },
        });
        const role = user.roles.map((role) => {
          return role.roles;
        });
        if (!user || user.status === "INACTIVE") {
          return res.status(403).send("INACTIVE");
        }
        const refresh = await prisma.token.findUnique({
          where: {
            token: token,
          },
        });
        if (refresh != null) {
          return res.status(403).send("LOGIN");
        }

        // Token is valid, proceed to next middleware
        req.merchant = user.id;
        req.role = role;
        next();
      }
    );
  } catch (error) {
    console.error("Error in verifyMerchant middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  verifyMerchant,
};
