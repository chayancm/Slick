const { PrismaClient, activestatus, currentRoles } = require("@prisma/client");
const { error } = require("console");
const { create } = require("domain");
const prisma = new PrismaClient();
const fun = async () => {
  try {
    const del = await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: {
        name: "chayan",
        email: "chayan@test.com",
        password: "123456",
        department: "home",
        roles: {
          create: [
            {
              roles: currentRoles.ADMIN,
            },
          ],
        },
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
fun();
