import jwt from "jsonwebtoken";
import User from "../../login/userSchema.js";
import { AppError } from "../../utils/AppError.js";

export const auth = (req, res, next) => {
  const userToken = req.headers["authorization"];
  if (!userToken || (userToken && !userToken.includes("Bearer"))) {
    return next(new AppError("token is required"), 400);
  }

  const token = userToken.split(" ")[1];
  jwt.verify(token, process.env.TOKEN, async (err, decoded) => {
    if (err) {
      return next(new AppError("Error verifying token", 402));
    }
    const user = await User.findById(decoded.id);
    if (user.owner ==decoded.owner ) {
      req.userId = decoded.id;
      next();
    } else {
      return next(new AppError("owner only can change ", 403));
    }
  });
};
