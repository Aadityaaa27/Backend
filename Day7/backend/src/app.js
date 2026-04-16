//server ko create karte h
const express = require('express');
const noteModel = require('./models/note.model');
const path = require('path');

const cors=require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
   const note= await noteModel.create({ title, description });
   res.status(201).json({
    message: "note created successfully",
    note
   })
})

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    //ye method database se sare notes ko fetch kar lega  and find method array of objects return karta h
    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})
//delete note from id from req.params

app.delete('/api/notes/:id', async (req, res) => {
    const  id  = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "note deleted successfully"
    })
})
//patch
//update the updation of note from id from req.params
app.patch('/api/notes/:id', async (req, res) => {
    const  id  = req.params.id;
    const { title, description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { title, description }, { new: true });
    res.status(200).json({
        message: "note updated successfully",
        note
    })
})
app.use("/{*any}",(req, res) => {
    // res.status(404).json({
    //     message: "route not found"
    // })
    // res.send("this is wildcard route")
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})
module.exports = app;