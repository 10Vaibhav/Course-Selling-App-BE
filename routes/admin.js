const {Router} = require("express");
const {adminModel} = require("../db");
const adminRouter = Router();

adminRouter.post("/signup", (req,res)=>{
    res.json({
        message: "admin signup endpoint",
    });
});

adminRouter.post("/signin", (req,res)=>{
    res.json({
        message: "admin signin endpoint",
    });
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

