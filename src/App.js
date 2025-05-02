import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Pages
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import InspirationPage from './pages/InspirationPage';
import TodoPage from './pages/TodoPage';
import HabitsPage from './pages/HabitsPage';
import MoodPage from './pages/MoodPage';
import PomodoroPage from './pages/PomodoroPage';
import PublicJournalPage from './pages/PublicJournalPage';
import MessageBoardPage from './pages/MessageBoardPage';
import DataExportPage from './pages/DataExportPage';
import RewardsPage from './pages/RewardsPage';
import GuestPage from './pages/GuestPage';

// Authentication context
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/public-journals" element={<PublicJournalPage />} />
          <Route path="/message-board" element={<MessageBoardPage />} />
          <Route path="/data-export" element={<DataExportPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/guest" element={<GuestPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App; 