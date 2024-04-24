const { PrismaClient, activestatus, currentRoles } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const handleNewAdmin = async (req, res) => {
  console.log("here");
  console.log(req.body);
  const { name, email, pwd } = req.body;

  if (!name || !email || !pwd)
    return res.status(400).json({ message: "All Fields are Mandatory." });

  const duplicate = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPwd,
        roles: {
          create: [
            {
              roles: currentRoles.USER,
            },
          ],
        },
      },
    });
    res.status(201).json({ success: `New user ${name} created!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewAdmin };
