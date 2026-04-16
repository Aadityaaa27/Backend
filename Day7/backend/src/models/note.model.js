const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
  })

  const noteModel = mongoose.model('note', noteSchema);
//ye jo name diya h note ye hi compass me show hota h 
  module.exports = noteModel;