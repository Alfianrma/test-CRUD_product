import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No Token!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Wrong Token" });
  }

  try {
    const verifyToken = jwt.verify(token, "secretkey");
    req.user = verifyToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed! Invalid token" });
  }
};

export default authMiddleware;
