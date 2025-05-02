import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if it exists
api.interceptors.request.use(config => {
  const user = localStorage.getItem('justLogUser');
  
  if (user) {
    // In a real app, this would be a JWT token
    // For our mock, we'll just add the user id
    config.headers.Authorization = `Bearer ${JSON.parse(user).uid}`;
  }
  
  return config;
});

// API service object with methods for different endpoints
const apiService = {
  // Journals
  getJournals: async (filters = {}) => {
    try {
      const response = await api.get('/journals', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching journals:', error);
      throw error;
    }
  },
  
  createJournal: async (journalData) => {
    try {
      const response = await api.post('/journals', journalData);
      return response.data;
    } catch (error) {
      console.error('Error creating journal:', error);
      throw error;
    }
  },
  
  getJournalById: async (id) => {
    try {
      const response = await api.get(`/journals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching journal ${id}:`, error);
      throw error;
    }
  },
  
  // Habits
  getHabits: async (userId) => {
    try {
      const response = await api.get('/habits', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  },
  
  createHabit: async (habitData) => {
    try {
      const response = await api.post('/habits', habitData);
      return response.data;
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
  },
  
  completeHabit: async (habitId, date) => {
    try {
      const response = await api.post(`/habits/${habitId}/complete`, { date });
      return response.data;
    } catch (error) {
      console.error('Error completing habit:', error);
      throw error;
    }
  },
  
  // Todos
  getTodos: async (userId) => {
    try {
      const response = await api.get('/todos', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },
  
  createTodo: async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },
  
  updateTodo: async (todoId, todoData) => {
    try {
      const response = await api.put(`/todos/${todoId}`, todoData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },
  
  // Moods
  getMoods: async (userId) => {
    try {
      const response = await api.get('/moods', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching moods:', error);
      throw error;
    }
  },
  
  createMood: async (moodData) => {
    try {
      const response = await api.post('/moods', moodData);
      return response.data;
    } catch (error) {
      console.error('Error creating mood:', error);
      throw error;
    }
  },
  
  // User Authentication
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  // Data Export
  exportData: async (userId) => {
    try {
      const response = await api.get(`/export/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }
};

export default apiService; 