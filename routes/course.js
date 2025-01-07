const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", (req,res)=>{
    res.json({
        message: "time to purchase",
    });
});



courseRouter.get("/", (req,res)=>{
    res.json({
        message: "All courses endpoint",
    });
});

module.exports = {
    courseRouter: courseRouter
}
