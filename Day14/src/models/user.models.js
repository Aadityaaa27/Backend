const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"User name is already exits"],
    required:[true,"User name is required"],
  },
  email:{
    type:String,
    unique:[true,"Email is already exits"],
    required:[true,"Email is required"],
  },
  password:{
    type:String,
    required:[true,"Password is required"],
  },
  bio:String,
  profileImage:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;