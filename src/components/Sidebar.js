import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-item logo">
        <Link to="/">Just Log</Link>
      </div>
      
      <nav className="sidebar-nav">
        <div className="sidebar-item">
          <Link to="/journal">
            <div className="sidebar-icon">📄</div>
            Journal
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/inspiration">
            <div className="sidebar-icon">💡</div>
            Inspiration
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/todo">
            <div className="sidebar-icon">📋</div>
            To-Do List
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/habits">
            <div className="sidebar-icon">📊</div>
            Habits
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/mood">
            <div className="sidebar-icon">😊</div>
            Mood
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/pomodoro">
            <div className="sidebar-icon">⏱️</div>
            Pomodoro
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/public-journals">
            <div className="sidebar-icon">📚</div>
            Public Journals
          </Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/message-board">
            <div className="sidebar-icon">📝</div>
            Message Board
          </Link>
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-item">
          <Link to="/data-export">Data Export</Link>
        </div>
        
        <div className="sidebar-item">
          <Link to="/rewards">Rewards</Link>
        </div>
        
        <div className="sidebar-item">
          {currentUser ? (
            <button onClick={logout} className="btn-link">Logout</button>
          ) : (
            <Link to="/guest">Guest</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 