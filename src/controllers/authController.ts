import { RequestHandler } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { hash, genSalt, compare } from "bcryptjs";

const JWT_SECRET = "anilbabu$oy";
//http://localhost:8080/user/auth/signup

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, designation, password } = req.body;
    console.log(email, designation, password);
    if (!designation) {
      res.status(401).json({ msg: "designation is  required", success: false });
    }
    if (!email) {
      res.status(401).json({ msg: "email is  required", success: false });
    }
    if (!password) {
      res.status(401).json({ msg: "password is  required", success: false });
    }
    let user = await User.findOne({ where: { email: email } });

    if (user) {
      res
        .status(401)
        .json({ status: false, msg: "User Allready exist with email" });
    } else {
      const salt = await genSalt(10);
      const secPass = await hash(password, salt);
      user = await User.create({
        designation: designation,
        email: email,
        password: secPass,
      });
      const data = {
        user: {
          empId: user.empId,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);

      res.status(200).json({
        status: true,
        token: token,
        msg: "Register  Successfully",
        user: user,
      });
    }
  } catch (error) {
    next(error);
  }
};
//http://localhost:8080/user/auth/signin
export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const {
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;

    if (!email) {
      res.status(401).json({ msg: "email required", success: false });
    }
    if (!password) {
      res.status(401).json({ msg: "password required", success: false });
    }
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ status: false, msg: "User name not exists" });
    } else {
      const matchpassword = await compare(password, user.password);

      if (!matchpassword) {
        res.status(401).json({ status: false, msg: "User name not exists" });
      } else {
        const data = {
          user: {
            empId: user.empId,
          },
        };

        console.log(data);
        const token = jwt.sign(data, JWT_SECRET);

        res.status(200).json({
          status: true,
          token: token,
          msg: "Login  Successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/// add profile http://localhost:8080/user/info

export const addprofile: RequestHandler = async (req, res, next) => {
  try {
    const { name, phone, address, joiningDate, department } = req.body;

    if (!name) {
      res.status(401).json({ msg: "name is required", success: false });
    }
    if (!phone) {
      res.status(401).json({ msg: "phone is required", success: false });
    }
    if (!joiningDate) {
      res.status(401).json({ msg: "joiningDate is required", success: false });
    }
    if (!address) {
      res.status(401).json({ msg: "address is required", success: false });
    }
    if (!department) {
      res.status(401).json({ msg: "department  is required", success: false });
    }

    await User.update(
      {
        name: name,
        phone: phone,
        joiningDate: joiningDate,
        address: address,
        department: department,
        status: "PENDING",
      },
      { where: { empId: req.user?.empId } }
    );
    const user = await User.findOne({
      where: { empId: req.user?.empId },
    });
    res.status(200).json({
      status: true,
      msg: "Profile Addeed  Successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

/// update profile http://localhost:8080/user/info

export const updateprofile: RequestHandler = async (req, res, next) => {
  try {
    const { name, phone, address, joiningDate, department } = req.body;
    let user = await User.findOne({
      where: { empId: req.user?.empId },
    });

    if (user?.status === "PENDING") {
      console.log(user?.status, user?.designation);

      await User.update(
        {
          name: name,
          phone: phone,
          joiningDate: joiningDate,
          address: address,
          department: department,
        },
        { where: { empId: req.user?.empId } }
      );
      user = await User.findOne({
        where: { empId: req.user?.empId },
      });
      res.status(200).json({
        status: true,
        msg: "Profile updated   Successfully",
        user: user,
      });
    } else {
      res.status(401).json({
        status: false,
        msg: "use have allready submited",
      });
    }
  } catch (error) {
    next(error);
  }
};

/// get profile http://localhost:8080/user/info

export const getprofile: RequestHandler = async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: { empId: req.user?.empId },
    });
    if (!user) {
      res.status(401).json({
        status: false,
        msg: "Please login",
        user: user,
      });
    }
    res.status(200).json({
      status: true,
      msg: "Profile updated   Successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
