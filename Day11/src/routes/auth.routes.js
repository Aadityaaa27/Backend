const express = require('express');
const authRouter = express.Router();
const UserModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

authRouter.post("/register", async (req, res) => {
  const{ name, email, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  
  const user = await UserModel.create(
    { name,
       email,
        password: hashedPassword
       });
  
  const token=jwt.sign({
     id: user._id,
     },process.env.JWT_SECRET,{
      expiresIn:"1h"
     });
     res.cookie("token",token);
  res.status(201).json({ 
    message: "User registered successfully",
     user:{
      name: user.name,
      email: user.email,
      password: user.password

     }
   });
     
});

authRouter.get("/get-me", async (req, res) => {
   const token=req.cookies.token;
   const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await UserModel.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      password: user.password,
    })
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Invalid email or password" });
  }
  const hash=crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordMatch=hash===user.password;
  if (!isPasswordMatch) {
    return res.status(404).json({ message: "Invalid email or password" });
  }
  const token=jwt.sign({
    id: user._id,
    },process.env.JWT_SECRET,{expiresIn:"1h"});

  res.cookie("token", token);
  res.json({
     message: "Login successful",
      user:{
        name: user.name,
        email: user.email,
        password: user.password
      }
     });
});
module.exports = authRouter;