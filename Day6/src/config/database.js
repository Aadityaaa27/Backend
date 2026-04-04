const mongoose = require('mongoose');

function connectToDB() {


  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to db');
  })
}

module.exports = connectToDB;
 //mongoosdb har ek notes ko id deta hai aur uske alawa title aur description bhi deta hai


 