const express = require('express');
const app = express();
const Note = require('./models/notes.model');
app.use(express.json());
//api create
// create a note 
app.post('/notes', async (req, res) => {
  const { title, description } = req.body;
  const note=await Note.create({ title, description });
  res.status(201).json({
    message: 'Note created successfully',
    note
  })
    });
    app.get('/notes', async (req, res) => {
      const note = await Note.find();
      res.status(200).json({
        message: 'Notes retrieved successfully',
        note
      });
    });
    module.exports = app;