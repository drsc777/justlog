import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const MoodPage = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [newMood, setNewMood] = useState({
    mood: 'happy',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  // Mood options
  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'angry', label: 'Angry', emoji: '😠' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'excited', label: 'Excited', emoji: '🤩' },
    { value: 'tired', label: 'Tired', emoji: '😴' }
  ];
  
  useEffect(() => {
    // In a real app, we would fetch from API
    // Simulating with some sample data
    const sampleData = [
      { id: 1, mood: 'happy', note: 'Completed a project', date: '2023-05-01' },
      { id: 2, mood: 'anxious', note: 'Deadline approaching', date: '2023-05-02' },
      { id: 3, mood: 'calm', note: 'Took time to meditate', date: '2023-05-03' }
    ];
    setMoodEntries(sampleData);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMood(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...newMood
    };
    setMoodEntries([newEntry, ...moodEntries]);
    setNewMood({
      mood: 'happy',
      note: '',
      date: new Date().toISOString().split('T')[0]
    });
  };
  
  const getMoodEmoji = (moodValue) => {
    const found = moodOptions.find(option => option.value === moodValue);
    return found ? found.emoji : '😐';
  };
  
  return (
    <Layout>
      <div className="mood-container">
        <h1>Mood Tracker</h1>
        
        <div className="mood-form-container">
          <h2>How are you feeling today?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mood">Mood</label>
              <select 
                id="mood" 
                name="mood" 
                value={newMood.mood}
                onChange={handleInputChange}
              >
                {moodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="note">Note (optional)</label>
              <textarea
                id="note"
                name="note"
                value={newMood.note}
                onChange={handleInputChange}
                placeholder="What made you feel this way?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newMood.date}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit" className="btn">Log Mood</button>
          </form>
        </div>
        
        <div className="mood-history">
          <h2>Mood History</h2>
          <div className="mood-entries">
            {moodEntries.length === 0 ? (
              <p>No mood entries yet. Start tracking your mood!</p>
            ) : (
              moodEntries.map(entry => (
                <div key={entry.id} className="mood-entry">
                  <div className="mood-emoji">{getMoodEmoji(entry.mood)}</div>
                  <div className="mood-details">
                    <p className="mood-date">{entry.date}</p>
                    <p className="mood-note">{entry.note || 'No notes'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoodPage; 