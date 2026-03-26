const express=require("express")

const app=express()

app.get('/',(req,res) => {
res.send("how are you ")
});
app.get('/about',(req,res) => {
res.send("i am fine ")
});
app.listen(3000)