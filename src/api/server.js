const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Import models
const Journal = require('./models/Journal');
const Habit = require('./models/Habit');
const Todo = require('./models/Todo');
const Mood = require('./models/Mood');
const User = require('./models/User');

// Middleware
app.use(cors());
app.use(express.json());

// Connection to MongoDB (commented out for local development)
// mongoose.connect('mongodb://localhost:27017/justlog', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// In-memory data store for demonstration
const inMemoryDB = {
  journals: [],
  habits: [],
  todos: [],
  moods: [],
  users: []
};

// Routes - Journals
app.get('/api/journals', (req, res) => {
  const { userId, isPublic } = req.query;
  
  // Filter journals based on query parameters
  let filteredJournals = [...inMemoryDB.journals];
  
  if (userId) {
    filteredJournals = filteredJournals.filter(journal => journal.userId === userId);
  }
  
  if (isPublic === 'true') {
    filteredJournals = filteredJournals.filter(journal => journal.public === true);
  }
  
  res.json(filteredJournals);
});

app.post('/api/journals', (req, res) => {
  const newJournal = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  inMemoryDB.journals.push(newJournal);
  res.status(201).json(newJournal);
});

app.get('/api/journals/:id', (req, res) => {
  const journal = inMemoryDB.journals.find(j => j.id === parseInt(req.params.id));
  
  if (!journal) {
    return res.status(404).json({ message: 'Journal not found' });
  }
  
  res.json(journal);
});

// Routes - Habits
app.get('/api/habits', (req, res) => {
  const { userId } = req.query;
  
  let filteredHabits = [...inMemoryDB.habits];
  
  if (userId) {
    filteredHabits = filteredHabits.filter(habit => habit.userId === userId);
  }
  
  res.json(filteredHabits);
});

app.post('/api/habits', (req, res) => {
  const newHabit = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    completions: []
  };
  
  inMemoryDB.habits.push(newHabit);
  res.status(201).json(newHabit);
});

app.post('/api/habits/:id/complete', (req, res) => {
  const { date } = req.body;
  const habitId = parseInt(req.params.id);
  
  const habitIndex = inMemoryDB.habits.findIndex(h => h.id === habitId);
  
  if (habitIndex === -1) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  
  const habit = inMemoryDB.habits[habitIndex];
  
  // Add completion date if it doesn't exist
  if (!habit.completions.includes(date)) {
    habit.completions.push(date);
  }
  
  inMemoryDB.habits[habitIndex] = habit;
  res.json(habit);
});

// Routes - Todos
app.get('/api/todos', (req, res) => {
  const { userId } = req.query;
  
  let filteredTodos = [...inMemoryDB.todos];
  
  if (userId) {
    filteredTodos = filteredTodos.filter(todo => todo.userId === userId);
  }
  
  res.json(filteredTodos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    completed: false
  };
  
  inMemoryDB.todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = inMemoryDB.todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  inMemoryDB.todos[todoIndex] = {
    ...inMemoryDB.todos[todoIndex],
    ...req.body
  };
  
  res.json(inMemoryDB.todos[todoIndex]);
});

// Routes - Moods
app.get('/api/moods', (req, res) => {
  const { userId } = req.query;
  
  let filteredMoods = [...inMemoryDB.moods];
  
  if (userId) {
    filteredMoods = filteredMoods.filter(mood => mood.userId === userId);
  }
  
  res.json(filteredMoods);
});

app.post('/api/moods', (req, res) => {
  const newMood = {
    ...req.body,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  inMemoryDB.moods.push(newMood);
  res.status(201).json(newMood);
});

// Routes - Users
app.post('/api/users/register', (req, res) => {
  const { email, password, displayName } = req.body;
  
  // Check if user already exists
  const existingUser = inMemoryDB.users.find(user => user.email === email);
  
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = {
    id: Date.now(),
    email,
    password, // In a real app, this would be hashed
    displayName,
    createdAt: new Date().toISOString()
  };
  
  inMemoryDB.users.push(newUser);
  
  // Don't send password back
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = inMemoryDB.users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Don't send password back
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Data Export route
app.get('/api/export/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Get all user data
  const userData = {
    journals: inMemoryDB.journals.filter(journal => journal.userId === userId),
    habits: inMemoryDB.habits.filter(habit => habit.userId === userId),
    todos: inMemoryDB.todos.filter(todo => todo.userId === userId),
    moods: inMemoryDB.moods.filter(mood => mood.userId === userId)
  };
  
  res.json(userData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 