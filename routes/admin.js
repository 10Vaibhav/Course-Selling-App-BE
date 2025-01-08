const {Router} = require("express");

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
})

module.exports = {
    adminRouter: adminRouter
}

