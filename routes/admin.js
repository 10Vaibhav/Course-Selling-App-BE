const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");

// const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "admin entry Incorrect format !!",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 4);

    await adminModel.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    res.json({
      message: "admin signup succeeded",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "admin signup has failed",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.status(403).json({
      message: "admin does not exist in our DB!!",
    });

    return;
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
      message: "admin signin succeeded !!",
    });
  } else {
    res.status(403).json({
      message: "admin Incorrect Credentials !!",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  try {
    const course = await courseModel.create({
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
      creatorId: adminId,
    });

    res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Course Creation failed",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  try {
    const checkCourse = await courseModel.findOne({
      _id: courseId,
      creatorId: adminId,
    });

    if (!checkCourse) {
      res.json({
        "sended course Id ": courseId,
        message: "Course Does not exist",
      });
      return;
    }

    const course = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      }
    );

    res.json({
      message: "Course Updated!!",
      courseId: course._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Course Update failed",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware,async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "All Course Received !!",
    courses: courses
  })
});

module.exports = {
  adminRouter: adminRouter,
};
