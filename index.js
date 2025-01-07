const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = 3000;

app.use(express.json());



app.listen(port, ()=>{
    console.log(`Server is Running on Port : ${port}`);
})