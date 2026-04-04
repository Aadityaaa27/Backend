//database ka code likhte hain serverjs me and second server ka port bhi likhte hain
require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const connectToDB = require('./src/config/database');
const app = require('./src/app');
connectToDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});