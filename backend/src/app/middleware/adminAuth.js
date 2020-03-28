import User from "../models/User";

export default async (req, res, next) => {
  const checkUserAdmin = await User.findOne({
    where: { id: req.userId, admin: true },
  });

  if (!checkUserAdmin) {
    return res
      .status(400)
      .json({ error: "Only admins can access this functionality" });
  }

  return next();
};
