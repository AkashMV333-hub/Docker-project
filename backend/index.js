// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const message = require('./Message');
const app = express();
const PORT = 3000;

dotenv.config()
const MONGO_URI =  process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { 
  dbName: 'text',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.post("/api/message", async (req,res) => {
    const { text } = req.body;

    const newMessage = new message({ text });
    await newMessage.save()
    
    res.status(201).json({ message: "message saved successfully" });
})

app.get('/api/hello', async (req, res) => {
    const getMessage = await message.find();
    res.json({"message": getMessage});
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
