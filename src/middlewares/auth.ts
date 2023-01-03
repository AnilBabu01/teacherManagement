import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";

const JWT_SECRET = "anilbabu$oy";

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    let validate: any;
    try {
      validate = verify(token.split(" ")[1], JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    if (!validate.user) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    console.log(validate);
    const user = await User.findOne({
      where: { empId: validate.user.empId },
    });

    if (!user) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    req.user = (user as any)._doc;
    next();
  } catch (error) {
    next(error);
  }
};
