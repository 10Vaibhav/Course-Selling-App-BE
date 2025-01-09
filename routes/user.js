const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect format !!",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 4);

    await userModel.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    res.json({
      message: "signup succeeded",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "signup has failed",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exist in our DB!!",
    });

    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    res.json({
      token: token,
      message: "signin succeeded !!",
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials !!",
    });
  }
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "Purchased Courses",
  });
});

module.exports = {
  userRouter: userRouter,
};
