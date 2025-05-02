import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';
import '../styles/PomodoroPage.css';

const PomodoroPage = () => {
  const { currentUser } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes in seconds
  
  const [focusLength, setFocusLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create an audio element for notifications
    audioRef.current = new Audio('/bell.mp3'); // This would be a real sound file in a complete app
    
    return () => {
      // Cleanup timer on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(secondsLeft => {
          if (secondsLeft <= 1) {
            clearInterval(intervalRef.current);
            playNotification();
            completeSession();
            return 0;
          }
          return secondsLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(mode === 'focus' ? focusLength * 60 : breakLength * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(newMode === 'focus' ? focusLength * 60 : breakLength * 60);
  };

  const completeSession = () => {
    if (mode === 'focus') {
      setSessionsCompleted(sessions => sessions + 1);
      switchMode('break');
    } else {
      switchMode('focus');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playNotification = () => {
    if (notificationsEnabled && audioRef.current) {
      audioRef.current.play();
      
      // Vibration API for mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate(500);
      }
      
      // Request browser notification permission
      if (Notification.permission === 'granted') {
        new Notification(`${mode === 'focus' ? 'Focus' : 'Break'} session completed!`);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  };

  const handleFocusChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 60) {
      setFocusLength(value);
      if (mode === 'focus' && !isActive) {
        setSecondsLeft(value * 60);
      }
    }
  };

  const handleBreakChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 30) {
      setBreakLength(value);
      if (mode === 'break' && !isActive) {
        setSecondsLeft(value * 60);
      }
    }
  };

  const toggleNotifications = () => {
    if (!notificationsEnabled) {
      // Request notification permission
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Calculate progress percentage
  const totalSeconds = mode === 'focus' ? focusLength * 60 : breakLength * 60;
  const progress = 100 - ((secondsLeft / totalSeconds) * 100);

  return (
    <Layout>
      <div className="pomodoro-container">
        <div className="pomodoro-header">
          <h1>Pomodoro Timer</h1>
        </div>
        
        <div className="pomodoro-content">
          <div className="timer-container pixel-border">
            <div className="mode-selector">
              <button 
                className={`mode-btn ${mode === 'focus' ? 'active' : ''}`}
                onClick={() => switchMode('focus')}
                disabled={isActive && !isPaused}
              >
                Focus
              </button>
              <button 
                className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
                onClick={() => switchMode('break')}
                disabled={isActive && !isPaused}
              >
                Break
              </button>
            </div>
            
            <div className="timer-display">
              <div className="time">{formatTime(secondsLeft)}</div>
              <div className="timer-progress-container">
                <div 
                  className="timer-progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="timer-controls">
              {!isActive ? (
                <button className="btn timer-btn" onClick={startTimer}>Start</button>
              ) : isPaused ? (
                <>
                  <button className="btn timer-btn" onClick={resumeTimer}>Resume</button>
                  <button className="btn timer-btn reset" onClick={resetTimer}>Reset</button>
                </>
              ) : (
                <>
                  <button className="btn timer-btn" onClick={pauseTimer}>Pause</button>
                  <button className="btn timer-btn reset" onClick={resetTimer}>Reset</button>
                </>
              )}
            </div>
          </div>
          
          <div className="settings-container pixel-border">
            <h2>Settings</h2>
            
            <div className="settings-group">
              <label>
                Focus Duration (minutes):
                <input 
                  type="number" 
                  min="1" 
                  max="60" 
                  value={focusLength} 
                  onChange={handleFocusChange}
                  disabled={isActive}
                />
              </label>
            </div>
            
            <div className="settings-group">
              <label>
                Break Duration (minutes):
                <input 
                  type="number" 
                  min="1" 
                  max="30" 
                  value={breakLength} 
                  onChange={handleBreakChange}
                  disabled={isActive}
                />
              </label>
            </div>
            
            <div className="settings-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={toggleNotifications}
                />
                Enable Sound & Notifications
              </label>
            </div>
          </div>
          
          <div className="stats-container pixel-border">
            <h2>Statistics</h2>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Sessions Completed:</span>
                <span className="stat-value">{sessionsCompleted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Focus Time:</span>
                <span className="stat-value">
                  {Math.floor(sessionsCompleted * focusLength / 60)} hr {sessionsCompleted * focusLength % 60} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PomodoroPage; 