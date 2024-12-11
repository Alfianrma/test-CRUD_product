import User from "../db/model/user.js";
import bcrypt from "bcryptjs";

const getUser = async (req, res) => {
  try {
    const user = await User.findAll({ where: { id: req.user.id } });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const updates = req.body;
  const user = await User.findByPk(req.params.id);
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.dataValues.id !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }
    await user.update(updates);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { updateUser, getUser };
