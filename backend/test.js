const { PrismaClient, activestatus, currentRoles } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const fun = async () => {
  try {
    //const del = await prisma.user.deleteMany();
    await prisma.coupon.deleteMany();
    //const hashedPwd = await bcrypt.hash("123456", 10);
    // const user = await prisma.user.create({
    //   data: {
    //     name: "chayan",
    //     email: "chayan@check.com",
    //     password: hashedPwd,
    //     department: "home",
    //     roles: {
    //       create: [
    //         {
    //           roles: currentRoles.ADMIN,
    //         },
    //       ],
    //     },
    //   },
    // });
    // console.log(user);
  } catch (error) {
    console.log(error);
  }
};
fun();
