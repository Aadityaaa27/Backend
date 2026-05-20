const express = require("express");
const userModel = require("../models/user.model");
const crytpo = require("crypto");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

async function handleLogin(req, res, credentials) {
  const { username, email, password } = credentials;

  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email",
    });
  }

  const hash = crytpo.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hash === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return res.cookie("token", token).status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;
  const isUserExit = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserExit) {
    return res.status(409).json({
      message:
        "User already exists" +
        (isUserExit.email === email
          ? " with this email"
          : " with this username"),
    });
  }

  const hash = crytpo.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .cookie("token", token)
    .status(201)
    .json({
      message: "User registered successfully",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
});

  authRouter.get("/login", async (req, res) => {
    return handleLogin(req, res, req.query);
  });

authRouter.post("/login", async (req, res) => {
    return handleLogin(req, res, req.body);
});


module.exports = authRouter;
