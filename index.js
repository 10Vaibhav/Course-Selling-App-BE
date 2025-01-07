const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = 3000;

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

