import { RequestHandler } from "express";
import { Qualification } from "../models/qualification";

export const addqualification: RequestHandler = async (req, res, next) => {
  const { type, percentage, totalMarks, subjects, startDate, endDate } =
    req.body;
  console.log(req.user?.empId);
  let Subjects = JSON.stringify(subjects);
  const qualification = await Qualification.create({
    type: type,
    percentage: percentage,
    totalMarks: totalMarks,
    subjects: Subjects,
    startDate: startDate,
    endDate: endDate,
    empId: req.user?.empId,
  });

  res.status(200).json({
    status: true,
    msg: "api is working",
    qualification: qualification,
  });
};

/// get qulification http://localhost:8080/user/qualification

export const getqualifications: RequestHandler = async (req, res, next) => {
  const qualification = await Qualification.findAll({
    where: { empId: req.user?.empId },
  });

  res.status(200).json({
    status: true,
    msg: "api is working",
    qualification: qualification,
  });
};
