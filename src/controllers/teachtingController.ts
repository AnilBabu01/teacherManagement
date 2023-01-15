import { RequestHandler } from "express";
import { Teaching } from "../models/teaching.model";
import { User } from "../models/user.model";
export const addTeaching: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, subject, Class } = req.body;
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
      if (!subject) {
        res.status(401).json({ msg: "Subject is required", status: false });
      }
      if (!Class) {
        res.status(401).json({ msg: "Class is required", status: false });
      }
      const teach = await Teaching.create({
        session: session,
        semester: semester,
        subject: subject,
        class: Class,
        empId: req.user?.empId,
      });

      res.status(200).json({
        status: true,
        msg: "Teaching class added successfully",
        teach: teach,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getTeaching: RequestHandler = async (req, res, next) => {
  try {
    let teachings = await Teaching.findAll({
      where: { empId: req.user?.empId },
    });

    res.status(200).json({
      status: true,
      msg: "Teachings fetch successfully",
      teach: teachings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeaching: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, subject, Class } = req.body;
    let teach = await Teaching.findOne({
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
      if (!teach) {
        res.status(401).json({
          status: false,
          msg: "Teaching is not found",
        });
      } else {
        if (req.user?.empId !== teach.empId) {
          res.status(401).json({
            status: false,
            msg: "You are not allowed to delete this",
          });
        } else {
          await Teaching.update(
            {
              session: session,
              semester: semester,
              subject: subject,
              class: Class,
            },
            { where: { id: req.body.id } }
          );
          teach = await Teaching.findOne({
            where: {
              id: req.body.id,
            },
          });
          res.status(200).json({
            Status: true,
            msg: "Teaching updated successfully",
            teach: teach,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTeaching: RequestHandler = async (req, res, next) => {
  try {
    let teach = await Teaching.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!teach) {
      res.status(401).json({
        status: false,
        msg: "Teaching is not found",
      });
    } else {
      if (req.user?.empId !== teach.empId) {
        res.status(401).json({
          status: false,
          msg: "You are not allowed to delete this",
        });
      } else {
        Teaching.destroy({
          where: {
            id: req.body.id,
          },
        });
        res
          .status(200)
          .json({ Status: true, msg: "Teaching deleted successfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};
