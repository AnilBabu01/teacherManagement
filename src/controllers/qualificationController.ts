import { RequestHandler } from "express";
import { Qualification } from "../models/qualification.model";
import { User } from "../models/user.model";
export const addqualification: RequestHandler = async (req, res, next) => {
  try {
    const { type, percentage, totalMarks, subjects, startDate, endDate } =
      req.body;
    let user = await User.findOne({
      where: { empId: req.user?.empId },
    });
    if (user?.status === "SUBMIT") {
      res.status(401).json({
        status: false,
        msg: "You have allready submited",
      });
    } else {
      if (!type) {
        res.status(401).json({ msg: "Semester is required", status: false });
      }
      if (!percentage) {
        res.status(401).json({ msg: "Session is required", status: false });
      }
      if (!totalMarks) {
        res.status(401).json({ msg: "Subject is required", status: false });
      }
      if (!subjects) {
        res.status(401).json({ msg: "Class is required", status: false });
      }
      if (!startDate) {
        res.status(401).json({ msg: "Class is required", status: false });
      }
      if (!endDate) {
        res.status(401).json({ msg: "Class is required", success: false });
      }
      const qualification = await Qualification.create({
        type: type,
        percentage: percentage,
        totalMarks: totalMarks,
        subjects: subjects,
        startDate: startDate,
        endDate: endDate,
        empId: req.user?.empId,
      });

      res.status(200).json({
        status: true,
        msg: "api is working",
        qualification: qualification,
      });
    }
  } catch (error) {
    next(error);
  }
};

/// get qulification http://localhost:8080/user/qualification

export const getqualifications: RequestHandler = async (req, res, next) => {
  try {
    const qualification = await Qualification.findAll({
      where: { empId: req.user?.empId },
    });

    res.status(200).json({
      status: true,
      msg: "api is working",
      qualification: qualification,
    });
  } catch (error) {
    next(error);
  }
};

export const deletegetqualification: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    let qualification = await Qualification.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!qualification) {
      res.status(401).json({
        status: false,
        msg: "qualification is not found",
      });
    } else {
      if (req.user?.empId !== qualification.empId) {
        res.status(401).json({
          status: false,
          msg: "You are not allowed to delete this",
        });
      } else {
        Qualification.destroy({
          where: {
            id: req.body.id,
          },
        });
        res
          .status(200)
          .json({ Status: true, msg: "qualification deleted successfully" });
      }
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      error: error,
    });
  }
};

export const updatequalification: RequestHandler = async (req, res, next) => {
  try {
    const { type, percentage, totalMarks, subjects, startDate, endDate } =
      req.body;
    let qualification = await Qualification.findOne({
      where: {
        id: req.body.id,
      },
    });
    let user = await User.findOne({
      where: { empId: req.user?.empId },
    });
    if (user?.status === "SUBMIT") {
      res.status(401).json({
        status: false,
        msg: "You have allready submited",
      });
    } else {
      if (!qualification) {
        res.status(401).json({
          status: false,
          msg: "Teaching is not found",
        });
      } else {
        if (req.user?.empId !== qualification.empId) {
          res.status(401).json({
            status: false,
            msg: "You are not allowed to delete this",
          });
        } else {
          await Qualification.update(
            {
              type: type,
              percentage: percentage,
              totalMarks: totalMarks,
              subjects: subjects,
              startDate: startDate,
              endDate: endDate,
            },
            { where: { id: req.body.id } }
          );
          qualification = await Qualification.findOne({
            where: {
              id: req.body.id,
            },
          });
          res.status(200).json({
            Status: true,
            msg: "Qualification is updated successfully",
            qualification: qualification,
          });
        }
      }
    }
  } catch (error) {}
};
