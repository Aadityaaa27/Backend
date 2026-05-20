const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"Image URL is required"]
    },
    user:{
      ref:"User",
      type:mongoose.Schema.Types.ObjectId,
      required:[true,"User id is required"]
    }
});

const postModel=mongoose.model("Post",postSchema);
module.exports=postModel;