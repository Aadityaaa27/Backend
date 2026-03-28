//post -resource ko create karte h server side pe ,client side se data bhejte h or ye btata h ki rontend se data aayega
//get-server side se data ko wapis le ke aate h


const express=require("express")
const app=express()
app.use(express.json())   //request.body ka data read karta h

app.listen(3000,()=>{
  console.log("server is running")
})
const notes=[]
app.post("/notes",(req,res)=>{
  console.log(req.body)
  notes.push(req.body)
  res.send("note created")
})
app.get("/notes",(req,res)=>{
  res.send(notes)
})


