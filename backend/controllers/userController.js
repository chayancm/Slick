const { PrismaClient, activestatus } = require("@prisma/client");
const { connect } = require("http2");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          select: { roles: true },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.roles),
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    console.log(req.body);
    const { data } = req.body;
    const userId = data.id;
    let roles = data.roles;
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { roles: true },
    });
    console.log(existingUser);
    const existingRoles = existingUser.roles;
    console.log("existingRoles", existingRoles);
    const existingRole = existingRoles.map((userRole) => userRole.roles);
    console.log(existingRole);
    const rolesToAdd = roles.filter((role) => {
      return !existingRole.includes(role);
    });

    console.log({ "rolestoadd ": rolesToAdd });
    const rolesToRemove = existingRoles.filter((existingRole) => {
      return !roles.some((role) => role === existingRole.roles);
    });
    // const newlyCreatedRoles = await prisma.roles.createMany({
    //   data: rolesToAdd.map((role) => ({
    //     roles: role,
    //     userId: userId,
    //   })),
    //   skipDuplicates: true,
    // });
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: email,
        password: data.hashedPwd,
        status: data.status,
        roles: {
          connectOrCreate: rolesToAdd.map((role) => ({
            where: { roles: role },
            create: { roles: role },
          })),
        },
      },
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error updating user" });
  }
};
module.exports = {
  editUser,
  getAllUser,
};
