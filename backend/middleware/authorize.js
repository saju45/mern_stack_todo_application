import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  console.log("token : ", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : ", decoded);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
