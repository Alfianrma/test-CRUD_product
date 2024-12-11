import User from "../db/model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { username, email, password, gender } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      gender,
    });
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Succesful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login };
