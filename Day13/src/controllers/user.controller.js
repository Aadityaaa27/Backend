const followModel=require("../models/follow.model");
const userModel=require("../models/user.models");
const mongoose=require("mongoose");

async function followUserController(req,res){
  try{
    const followerId=req.user.id || req.user._id;
    const followeeUsername=req.params.username;

    const followee=await userModel.findOne({username:followeeUsername});
    if(!followee){
      return res.status(404).json({message:"User to follow not found"});
    }

    // prevent following self
    if(followerId.toString()===followee._id.toString()){
      return res.status(400).json({message:"Cannot follow yourself"});
    }

    const followRecord=await followModel.create({
      follower: mongoose.Types.ObjectId(followerId),
      following: followee._id
    });

    return res.status(201).json({
      message:`${req.user.username} is now following ${followeeUsername}`,
      follow:followRecord
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Server error"});
  }

}

module.exports={
  followUserController
}