const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
function connectToDB() {
  mongoose.connect("mongodb+srv://aadi27003_db_user:iLmqI0ZRK9is2hMq@cluster0.ozfvo8z.mongodb.net/day-5").then(() => {
    console.log("connected to db");
  })
}
connectToDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});