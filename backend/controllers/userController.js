const { PrismaClient, activestatus } = require("@prisma/client");
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
    const { userId, roles, ...userData } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { roles: true },
    });
    const existingRoles = existingUser.roles;
    const rolesToAdd = roles.filter(
      (newRole) =>
        !existingRoles.some(
          (existingRole) => existingRole.roles === newRole.roles
        )
    );
    const rolesToRemove = existingRoles.filter(
      (existingRole) =>
        !roles.some((newRole) => newRole.roles === existingRole.roles)
    );

    const newlyCreatedRoles = await prisma.roles.createMany({
      data: rolesToAdd.map((role) => ({ roles: role.roles })),
      skipDuplicates: true,
    });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        roles: {
          connect: newlyCreatedRoles.map((role) => ({ id: role.id })),
          disconnect: rolesToRemove.map((role) => ({ id: role.id })),
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
