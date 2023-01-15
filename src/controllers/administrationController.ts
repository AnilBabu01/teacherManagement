import { RequestHandler } from "express";
import { Administration } from "../models/administration.model";
import { Qualification } from "../models/qualification.model";
import { User } from "../models/user.model";
export const addAdministration: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, designation, work } = req.body;
    let user = await User.findOne({
      where: { empId: req.user?.empId },
    });
    if (user?.status === "SUBMIT") {
      res.status(401).json({
        status: false,
        msg: "You have allready submited",
      });
    } else {
      if (!session) {
        res.status(401).json({ msg: "Session is required", status: false });
      }
      if (!semester) {
        res.status(401).json({ msg: "Semester is required", status: false });
      }
      if (!designation) {
        res.status(401).json({ msg: "Designation is required", status: false });
      }
      if (!work) {
        res.status(401).json({ msg: "Work is required", status: false });
      }

      const administration = await Administration.create({
        session: session,
        semester: semester,
        work: work,
        designation: designation,
        empId: req.user?.empId,
      });

      res.status(200).json({
        status: true,
        msg: "Administration class added successfully",
        administration: administration,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAdministration: RequestHandler = async (req, res, next) => {
  try {
    let administration = await Administration.findAll({
      where: { empId: req.user?.empId },
    });

    res.status(200).json({
      status: true,
      msg: "Administration fetch successfully",
      administration: administration,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdministration: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, designation, work } = req.body;
    let administration = await Administration.findOne({
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
      if (!administration) {
        res.status(401).json({
          status: false,
          msg: "administration is not found",
        });
      } else {
        if (req.user?.empId !== administration.empId) {
          res.status(401).json({
            status: false,
            msg: "You are not allowed to update",
          });
        } else {
          await Administration.update(
            {
              session: session,
              semester: semester,
              work: work,
              designation: designation,
            },
            { where: { id: req.body.id } }
          );
          administration = await Administration.findOne({
            where: {
              id: req.body.id,
            },
          });
          res.status(200).json({
            Status: true,
            msg: "administration updated successfully",
            administration: administration,
          });
        }
      }
    }
  } catch (error) {}
};

export const deleteAdministration: RequestHandler = async (req, res, next) => {
  try {
    let administration = await Administration.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!administration) {
      res.status(401).json({
        status: false,
        msg: "Administration is not found",
      });
    } else {
      if (req.user?.empId !== administration.empId) {
        res.status(401).json({
          status: false,
          msg: "You are not allowed to delete this",
        });
      } else {
        Administration.destroy({
          where: {
            id: req.body.id,
          },
        });
        res
          .status(200)
          .json({ Status: true, msg: "Administration deleted successfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};
