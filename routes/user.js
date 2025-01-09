const {Router} = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/signup", async (req,res)=>{

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(20),
        firstName: z.string().min(3),
        lastName: z.string().min(3)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect format !!",
            error: parsedDataWithSuccess.error,
        });
        return;
    }

    try{

        const hashedPassword = await bcrypt.hash(req.body.password,4);

        await userModel.create({
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    }catch(error){
        console.log(error);
        res.json({
            message: "signup has failed",
        });

        return;
    }

    res.json({
        message: "signup succeeded",
    });

});

userRouter.post("/signin", (req,res)=>{
    res.json({
        message: "signin endpoint",
    });
});

userRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "Purchased Courses",
    });
});

module.exports = {
    userRouter: userRouter
}
