import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify JWT token

// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res
//           .status(403)
//           .json({ message: "Access denied. Invalid token." });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }
// };

// Middleware to generate JWT token

export const generateToken = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(user?._id, { token });
  return token;
};
