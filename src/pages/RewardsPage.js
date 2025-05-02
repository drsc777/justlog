import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const RewardsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  
  useEffect(() => {
    // In a real app, we would fetch from API
    // Simulating with some sample data
    const sampleAchievements = [
      {
        id: 1,
        title: "Journaling Beginner",
        description: "Write your first journal entry",
        icon: "📝",
        points: 10,
        unlocked: true,
        date: "2023-04-20"
      },
      {
        id: 2,
        title: "Habit Builder",
        description: "Track a habit for 7 consecutive days",
        icon: "🔄",
        points: 25,
        unlocked: true,
        date: "2023-04-25"
      },
      {
        id: 3,
        title: "Focus Master",
        description: "Complete 10 pomodoro sessions",
        icon: "⏱️",
        points: 30,
        unlocked: false,
        progress: 6,
        total: 10
      },
      {
        id: 4,
        title: "Task Champion",
        description: "Complete 20 tasks",
        icon: "✅",
        points: 40,
        unlocked: false,
        progress: 12,
        total: 20
      },
      {
        id: 5,
        title: "Inspiring Writer",
        description: "Add 5 quotes to your inspiration wall",
        icon: "💡",
        points: 20,
        unlocked: true,
        date: "2023-05-01"
      }
    ];
    
    setAchievements(sampleAchievements);
    
    // Calculate total points from unlocked achievements
    const points = sampleAchievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + a.points, 0);
    
    setUserPoints(points);
    
    // Calculate level (1 level per 50 points)
    setUserLevel(Math.max(1, Math.floor(points / 50) + 1));
  }, []);
  
  const calculateProgress = (current, total) => {
    return Math.floor((current / total) * 100);
  };
  
  return (
    <Layout>
      <div className="rewards-container">
        <h1>Achievements & Rewards</h1>
        
        <div className="user-status">
          <div className="level-badge">
            <span className="level-number">{userLevel}</span>
            <span className="level-label">Level</span>
          </div>
          
          <div className="points-info">
            <h2>{userPoints} Points</h2>
            <p>Next level: {userLevel * 50} points</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateProgress(userPoints % 50, 50)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="achievements-section">
          <h2>Your Achievements</h2>
          
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                
                {achievement.unlocked ? (
                  <div className="achievement-unlocked">
                    <span className="points-badge">+{achievement.points} pts</span>
                    <span className="unlock-date">Unlocked: {achievement.date}</span>
                  </div>
                ) : (
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${calculateProgress(achievement.progress, achievement.total)}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {achievement.progress} / {achievement.total}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="rewards-section">
          <h2>Available Rewards</h2>
          <p>Coming soon: Use your points to unlock special themes, features, and more!</p>
        </div>
      </div>
    </Layout>
  );
};

export default RewardsPage; 