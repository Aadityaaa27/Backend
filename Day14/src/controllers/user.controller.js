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

    //is followee exists
      const isFolloweeExits=await userModel.findOne({
        username:followeeUsername
      })
      if(!isFolloweeExits){
        return res.status(404).json({
          message:"User to follow not found"
        });
       }



    // check if already following
    const existingFollow=await followModel.findOne({
      follower: followerId,
      following: followee._id
    });
    if(existingFollow){
      return res.status(400).json({message:`Already following ${followeeUsername}`});
    }

    const followRecord=await followModel.create({
      follower: new mongoose.Types.ObjectId(followerId),
      following: followee._id
    });

    return res.status(201).json({
      message:`${req.user.username} is now following ${followeeUsername}`,
      follow:followRecord
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Server error", error: err.message});
  }

}

async function unfollowUserController(req,res){
  const followerUsername=req.user.username;
  const followeeUsername=req.params.username;

  const isUserFollowing=await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername
  });

  if(!isUserFollowing){
    return res.status(400).json({message:`You are not following ${followeeUsername}`});
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  return res.status(200).json({message:`You have unfollowed ${followeeUsername}`});
}

module.exports={
  followUserController,
  unfollowUserController
}