import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div className="home-container">
        <header className="home-header">
          <h1>Just Log</h1>
          <p>A calm space for self-reflection and productivity</p>
        </header>

        <div className="home-sections">
          <div className="home-section pixel-border">
            <h2>Journal</h2>
            <p>Write your thoughts in text or record them with voice input.</p>
            <Link to="/journal" className="btn">Open Journal</Link>
          </div>

          <div className="home-section pixel-border">
            <h2>Latest Entries</h2>
            {currentUser ? (
              <div className="home-entries">
                {/* Placeholder for entries - would be loaded from API */}
                <p>No entries yet. Start writing today!</p>
              </div>
            ) : (
              <p>Login or continue as guest to see your entries</p>
            )}
          </div>
          
          <div className="home-section pixel-border">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/todo" className="btn">To-Do List</Link>
              <Link to="/pomodoro" className="btn">Pomodoro Timer</Link>
              <Link to="/habits" className="btn">Habit Tracker</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 