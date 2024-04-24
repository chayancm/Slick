const authorizeStore = async (req, res, next) => {
  const storeId = req.params.storeId;
  const userId = req.user.id;
  const roles = req.user.role;
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: { merchant: true },
  });

  if (
    !store ||
    store.merchant.id !== userId ||
    !roles.include("ADMIN") ||
    !roles.include("EDITOR")
  ) {
    return res.status(403).json({ error: "Unauthorized to edit this store" });
  }

  next();
};
module.exports = {
  authorizeStore,
};
