import { RequestHandler } from "express";
import { Research } from "../models/research.model";
import { User } from "../models/user.model";

export const addResearch: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, paperTitle, author, journalName, publishDate } =
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
      if (!session) {
        res.status(401).json({ msg: "Session is required", status: false });
      }
      if (!semester) {
        res.status(401).json({ msg: "Semester is required", status: false });
      }
      if (!paperTitle) {
        res.status(401).json({ msg: "PaperTitle is required", status: false });
      }
      if (!author) {
        res.status(401).json({ msg: "Author is required", status: false });
      }
      if (!journalName) {
        res.status(401).json({ msg: "JournalName is required", status: false });
      }
      if (!publishDate) {
        res.status(401).json({ msg: "PublishDate is required", status: false });
      }

      const research = await Research.create({
        session: session,
        semester: semester,
        paperTitle: paperTitle,
        author: author,
        journalName: journalName,
        publishDate: publishDate,
        empId: req.user?.empId,
      });

      res.status(200).json({
        status: true,
        msg: "Research class added successfully",
        research: research,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getResearch: RequestHandler = async (req, res, next) => {
  try {
    let research = await Research.findAll({
      where: { empId: req.user?.empId },
    });

    res.status(200).json({
      status: true,
      msg: "research fetch successfully",
      research: research,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResearch: RequestHandler = async (req, res, next) => {
  try {
    const { session, semester, paperTitle, author, journalName, publishDate } =
      req.body;
    let research = await Research.findOne({
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
      if (!research) {
        res.status(401).json({
          status: false,
          msg: "Research is not found",
        });
      } else {
        if (req.user?.empId !== research.empId) {
          res.status(401).json({
            status: false,
            msg: "You are not allowed to update",
          });
        } else {
          await Research.update(
            {
              session: session,
              semester: semester,
              paperTitle: paperTitle,
              author: author,
              journalName: journalName,
              publishDate: publishDate,
            },
            { where: { id: req.body.id } }
          );
          research = await Research.findOne({
            where: {
              id: req.body.id,
            },
          });
          res.status(200).json({
            Status: true,
            msg: "Research updated successfully",
            research: research,
          });
        }
      }
    }
  } catch (error) {}
};

export const deleteResearch: RequestHandler = async (req, res, next) => {
  try {
    let research = await Research.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!research) {
      res.status(401).json({
        status: false,
        msg: "Research is not found",
      });
    } else {
      if (req.user?.empId !== research.empId) {
        res.status(401).json({
          status: false,
          msg: "You are not allowed to delete this",
        });
      } else {
        Research.destroy({
          where: {
            id: req.body.id,
          },
        });
        res
          .status(200)
          .json({ Status: true, msg: "Research deleted successfully" });
      }
    }
  } catch (error) {
    next(error);
  }
};
