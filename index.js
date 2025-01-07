const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = 3000;

app.use(express.json());

app.post("/user/signup", (req,res)=>{
    res.json({
        message: "signup endpoint",
    });
});

app.post("/user/signin", (req,res)=>{
    res.json({
        message: "signin endpoint",
    });
});

app.post("/course/purchase", (req,res)=>{
    res.json({
        message: "time to purchase",
    });
});

app.get("/user/purchases", (req,res)=>{
    res.json({
        message: "Purchased Courses",
    });
});

app.get("/courses", (req,res)=>{
    res.json({
        message: "All courses endpoint",
    });
});


app.listen(port, ()=>{
    console.log(`Server is Running on Port : ${port}`);
});

