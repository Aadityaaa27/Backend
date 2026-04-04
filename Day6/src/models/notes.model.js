const mongoose=require("mongoose")

//database bolta h ki main data to store kar lunga lekin uska schema kya hoga ye to hume define karna padega
//schema define karne ke liye hume mongoose ka schema use karna padega
const noteSchema= new mongoose.Schema({
    title:String,
    description:String,
})



//agar schema maine jo define kiya h uske alawa koi bhi field aati h to wo ignore kar di jayegi,jaise ki maine title aur description define kiya h to agar user koi aur field bhejta h to wo ignore kar di jayegi,postman me maine age prioperty aur di aur wo koi imfact nhi create kar payi
       
//db me crud operation perform karne ke liye hume model create karna padega



// Model ka naam 'Note' rakho (Capital 'N' aur singular)
const Note = mongoose.model('Note', noteSchema);

module.exports=Note;