const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 1);

  await prisma.token.create({
    data: {
      token: refreshToken,
      expirationTime: expirationTime,
    },
  });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(204).send("logout");
};

module.exports = { handleLogout };
