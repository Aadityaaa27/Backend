const userModel=require('../models/user.models');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function registerController(req,res){
  const {username,email,password,bio,profileImage}=req.body;
   const isUserExist=await userModel.findOne({
   
    $or:[
      {username},
      {email}
    ]});

    if(isUserExist){
      return res.status(409).json({
        message:"User already exist"+(isUserExist.email===email?" with this email":" with this username")
      });
    }
  
  //  const hash=crypto.createHash("sha256").update(password).digest("hex");
  const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
      username,
      email,
      password:hash,
      bio,
      profileImage
    });

    const secret=process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;

    if(!secret){
      return res.status(500).json({
        message:"JWT secret is not configured"
      });
    }

    const token=jwt.sign({id:user._id},secret,{expiresIn:"1d"});


     res.cookie("token",token);
    res.status(201).json({
      message:"User registered successfully",
      token,
      user:{
        email:user.email,
        username: user.username,
        bio:user.bio,
        profileImage:user.profileImage
      }
    });

   
}


  async function loginController(req,res){
  const {username,email,password}=req.body;
  const loginConditions=[];

  if(username){
    loginConditions.push({username});
  }

  if(email){
    loginConditions.push({email});
  }

  if(loginConditions.length===0){
    return res.status(400).json({
      message:"Username or email is required"
    });
  }

  const user=await userModel.findOne({
    $or:loginConditions
  });

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }
    if(password){
      // const hash=crypto.createHash("sha256").update(password).digest("hex");
      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
        return res.status(401).json({
          message:"Invalid password"
        });
      }
    }
   const secret=process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;

   if(!secret){
      return res.status(500).json({
        message:"JWT secret is not configured"
      });
    }

   const token=jwt.sign({id:user._id},secret,{expiresIn:"1d"});
      res.cookie("token",token);
     res.status(200).json({
      message:"User logged in successfully",
      user:{
        email:user.email,
        username: user.username,
        bio:user.bio,
        profileImage:user.profileImage
      }
     });
}

module.exports={registerController,loginController};