const express=require("express");
const UserModel=require("../models/user.model");
const jwt=require("jsonwebtoken");

const authRouter=express.Router();
const crypto=require("crypto");

authRouter.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    const isUserAlreadyExits=await UserModel.findOne({email});
    if(isUserAlreadyExits){
        return res.status(400).json({
            message:"user already exists with this email"
        });
    }
    const hash=crypto.createHash("md5").update(password).digest("hex");
    const user=await UserModel.create({
      name,
      email,
      password:hash
    });
    const token=jwt.sign(
        {
            id:user._id,
            email:user.email,
        },
        process.env.JWT_SECRET,
    )
    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user created successfully",
        user,
        token
    });
})
authRouter.post("/protected",async (req,res)=>{
   console.log(req.cookies);
   res.status(200).json({    message:"you have accessed protected route"
   })
});
//controller for login route

authRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"user not found with this email"
        });
    }
    const isPasswordMatched=user.password===crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(400).json({
            message:"invalid credentials"
        });
    }
    const token=jwt.sign(
        {
            id:user._id,
            email:user.email,
        },
        process.env.JWT_SECRET,
    )
    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"login successful",
        user,
        token
    });
})
module.exports=authRouter;
