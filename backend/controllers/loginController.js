const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cookieParser = require("cookie-parser");
const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "emailname and password are required." });
  const foundUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      roles: true,
    },
  });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const role = foundUser.roles.map((role) => {
      return role.roles;
    });
    let onlyUser = true;
    if (role.includes("ADMIN") || role.includes("EDITOR")) {
      onlyUser = false;
    }
    const refreshToken = jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.name,
        email: email,
        onlyUser: onlyUser,
        timestamp: Date.now(),
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", refreshToken, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ Login: true, role: role });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
