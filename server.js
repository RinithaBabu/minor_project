const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to parse JSON data from requests

// Connect to MongoDB Compass
// Use the local connection string with your chosen database name
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/';

mongoose.connect(LOCAL_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Compass'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a To-Do Schema
const todoSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create a Model from the Schema
const Todo = mongoose.model('Todo', todoSchema);

// --- API Endpoints for CRUD Operations ---

// CREATE (POST) a new To-Do item
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create to-do' });
  }
});

// READ (GET) all To-Do items
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch to-dos' });
  }
});

// UPDATE (PUT) a To-Do item
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update to-do' });
  }
});

// DELETE (DELETE) a To-Do item
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'To-do deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete to-do' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});