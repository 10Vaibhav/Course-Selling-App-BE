const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = 3000;

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {

  await mongoose.connect(process.env.connection);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();