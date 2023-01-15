import { RequestHandler } from "express";
import { Marks } from "../models/marks.model";
import { User } from "../models/user.model";
import { allowDesigantion } from "../utils/helper";

export const addMark: RequestHandler = async (req, res, next) => {
  let allow = allowDesigantion(req.user?.designation);

  const { empId, session, marks, remarks } = req.body;
  let user = await User.findOne({
    where: { empId: empId },
  });

  let update = allow.includes(req.user?.designation);

  res.status(200).json({
    msg: "api is woring",
    user: user,
    allow: allow,
    update: update,
  });
};
