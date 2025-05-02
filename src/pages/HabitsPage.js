import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HabitCalendar from '../components/HabitCalendar';
import { useAuth } from '../utils/AuthContext';
import { format } from 'date-fns';
import '../styles/HabitsPage.css';

const HabitsPage = () => {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitGoal, setNewHabitGoal] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);
  
  // Load habits - would fetch from API in a real app
  useEffect(() => {
    // Simulating API call with local data
    const mockHabits = [
      { 
        id: 1, 
        name: 'Reading', 
        description: 'Read at least 30 minutes daily',
        goal: 'Read 12 books this year',
        completions: ['2024-04-20', '2024-04-21', '2024-04-22'] 
      },
      { 
        id: 2, 
        name: 'Exercise', 
        description: 'Workout or walk at least 15 minutes',
        goal: 'Exercise 4 times per week',
        completions: ['2024-04-19', '2024-04-21'] 
      }
    ];
    
    setHabits(mockHabits);
    if (mockHabits.length > 0) {
      setSelectedHabit(mockHabits[0]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newHabit.trim()) return;
    
    const habit = {
      id: Date.now(),
      name: newHabit,
      description: '',
      goal: newHabitGoal,
      completions: []
    };
    
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    setSelectedHabit(habit);
    setNewHabit('');
    setNewHabitGoal('');
  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit);
  };

  const handleDateClick = (date) => {
    if (!selectedHabit) return;
    
    const habit = { ...selectedHabit };
    
    // Toggle completion for the date
    if (habit.completions.includes(date)) {
      habit.completions = habit.completions.filter(d => d !== date);
    } else {
      habit.completions = [...habit.completions, date];
    }
    
    // Update the habit in the array
    const updatedHabits = habits.map(h => 
      h.id === habit.id ? habit : h
    );
    
    setHabits(updatedHabits);
    setSelectedHabit(habit);
  };

  const calculateStreak = (completions) => {
    if (!completions || completions.length === 0) return 0;
    
    // Sort dates in ascending order
    const sortedDates = [...completions].sort();
    
    // Get today's date in the same format as completions
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if today is completed
    const isTodayCompleted = completions.includes(today);
    
    if (!isTodayCompleted) return 0;
    
    // Calculate streak
    let streak = 1;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    while (streak < sortedDates.length) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - streak);
      const checkDateStr = format(checkDate, 'yyyy-MM-dd');
      
      if (completions.includes(checkDateStr)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);
    
    if (selectedHabit && selectedHabit.id === habitId) {
      setSelectedHabit(updatedHabits.length > 0 ? updatedHabits[0] : null);
    }
  };

  return (
    <Layout>
      <div className="habits-container">
        <div className="habits-header">
          <h1>Habit Tracker</h1>
        </div>
        
        <div className="habits-content">
          <div className="habits-sidebar pixel-border">
            <form onSubmit={handleSubmit} className="habit-form">
              <div className="form-group">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="New habit name..."
                  className="habit-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  value={newHabitGoal}
                  onChange={(e) => setNewHabitGoal(e.target.value)}
                  placeholder="Goal (optional)"
                  className="habit-goal-input"
                />
              </div>
              
              <button type="submit" className="btn add-btn">Add Habit</button>
            </form>
            
            <div className="habits-list">
              <h2>Your Habits</h2>
              
              {habits.length === 0 ? (
                <p className="no-habits">No habits yet. Add one above!</p>
              ) : (
                <ul className="habit-items">
                  {habits.map(habit => (
                    <li 
                      key={habit.id} 
                      className={`habit-item ${selectedHabit && selectedHabit.id === habit.id ? 'selected' : ''}`}
                      onClick={() => handleHabitSelect(habit)}
                    >
                      <div className="habit-item-content">
                        <div className="habit-name">{habit.name}</div>
                        <div className="habit-meta">
                          <span className="habit-streak">
                            {calculateStreak(habit.completions)} day streak
                          </span>
                          <button 
                            className="delete-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHabit(habit.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="habit-details pixel-border">
            {selectedHabit ? (
              <>
                <div className="habit-detail-header">
                  <h2>{selectedHabit.name}</h2>
                  {selectedHabit.goal && (
                    <div className="habit-goal">Goal: {selectedHabit.goal}</div>
                  )}
                </div>
                
                <div className="habit-statistics">
                  <div className="stat-item">
                    <div className="stat-label">Current Streak</div>
                    <div className="stat-value">{calculateStreak(selectedHabit.completions)} days</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">Completion Rate</div>
                    <div className="stat-value">
                      {Math.round((selectedHabit.completions.length / 30) * 100)}%
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">Total Completions</div>
                    <div className="stat-value">{selectedHabit.completions.length} days</div>
                  </div>
                </div>
                
                <div className="calendar-container">
                  <p className="calendar-instruction">Click on dates to mark them as complete:</p>
                  <HabitCalendar 
                    completions={selectedHabit.completions} 
                    onDateClick={handleDateClick}
                  />
                </div>
              </>
            ) : (
              <div className="no-habit-selected">
                <p>Select a habit from the list or create a new one to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HabitsPage; 