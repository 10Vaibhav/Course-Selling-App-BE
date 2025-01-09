const {Router} = require("express");
const {adminModel} = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {z} = require("zod");
const bcrypt = require("bcrypt");

dotenv.config()

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

const adminRouter = Router();

adminRouter.post("/signup", async (req,res)=>{
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

adminRouter.post("/signin", async(req,res)=>{
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

adminRouter.post("/course", (req,res)=>{
    res.json({
        message: "admin course end point",
    })
});

adminRouter.put("/course", (req,res)=>{
    res.json({
        message: "admin update course end point",
    });
});

adminRouter.get("/course/bulk", (req,res)=>{
    res.json({
        message: "admin get courses in bulk",
    });
});

module.exports = {
    adminRouter: adminRouter
}

