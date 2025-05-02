import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';
import '../styles/JournalPage.css';

const JournalPage = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: [],
    public: false
  });
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [newTag, setNewTag] = useState('');

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        
        if (transcript) {
          setCurrentEntry(prev => ({
            ...prev,
            content: prev.content + ' ' + transcript
          }));
        }
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognition);
    }
  }, []);

  const toggleVoiceInput = () => {
    setIsVoiceInput(!isVoiceInput);
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = () => {
    if (newTag.trim() !== '') {
      setCurrentEntry(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setCurrentEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would save to a database via API
    const newEntry = {
      ...currentEntry,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: currentUser ? currentUser.uid : 'guest'
    };
    
    setEntries([newEntry, ...entries]);
    
    // Clear form
    setCurrentEntry({
      title: '',
      content: '',
      mood: '',
      tags: [],
      public: false
    });
  };

  return (
    <Layout>
      <div className="journal-container">
        <div className="journal-header">
          <h1>Journal</h1>
          <div className="input-toggle">
            <button 
              className={`btn ${!isVoiceInput ? 'active' : ''}`} 
              onClick={() => setIsVoiceInput(false)}
            >
              📄 Journal
            </button>
            <button 
              className={`btn ${isVoiceInput ? 'active' : ''}`} 
              onClick={toggleVoiceInput}
            >
              🎤 Journal
            </button>
          </div>
        </div>
        
        <div className="journal-content">
          <form onSubmit={handleSubmit} className="journal-form pixel-border">
            {isVoiceInput ? (
              <div className="voice-input-container">
                <textarea
                  name="content"
                  value={currentEntry.content}
                  onChange={handleInputChange}
                  placeholder="Write your entry..."
                  rows={8}
                  readOnly={isRecording}
                  className="voice-textarea"
                ></textarea>
                
                <div className="voice-controls">
                  {isRecording ? (
                    <button 
                      type="button" 
                      className="btn record-btn recording" 
                      onClick={stopRecording}
                    >
                      Stop Recording
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn record-btn" 
                      onClick={startRecording}
                    >
                      Start Recording
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-input-container">
                <input
                  type="text"
                  name="title"
                  value={currentEntry.title}
                  onChange={handleInputChange}
                  placeholder="Entry Title"
                  className="entry-title"
                />
                
                <textarea
                  name="content"
                  value={currentEntry.content}
                  onChange={handleInputChange}
                  placeholder="Write your entry..."
                  rows={8}
                  className="entry-content"
                ></textarea>
              </div>
            )}
            
            <div className="entry-meta">
              <div className="meta-item">
                <label>Mood:</label>
                <select 
                  name="mood" 
                  value={currentEntry.mood} 
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="anxious">Anxious</option>
                  <option value="calm">Calm</option>
                  <option value="energetic">Energetic</option>
                  <option value="tired">Tired</option>
                </select>
              </div>
              
              <div className="meta-item">
                <label>Tags:</label>
                <div className="tag-input">
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                  />
                  <button 
                    type="button" 
                    onClick={handleTagAdd} 
                    className="btn tag-btn"
                  >
                    Add
                  </button>
                </div>
                
                <div className="tags-container">
                  {currentEntry.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleTagRemove(tag)} 
                        className="tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="meta-item">
                <label>
                  <input
                    type="checkbox"
                    name="public"
                    checked={currentEntry.public}
                    onChange={(e) => setCurrentEntry({...currentEntry, public: e.target.checked})}
                  />
                  Make entry public
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn save-btn">Save</button>
            </div>
          </form>
          
          <div className="journal-entries pixel-border">
            <h2>Previous Entries</h2>
            
            {entries.length === 0 ? (
              <p className="no-entries">No entries yet. Start writing!</p>
            ) : (
              <div className="entries-list">
                {entries.map(entry => (
                  <div key={entry.id} className="entry-item">
                    <div className="entry-header">
                      <h3>{entry.title}</h3>
                      <span className="entry-date">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="entry-snippet">
                      {entry.content.substring(0, 100)}
                      {entry.content.length > 100 ? '...' : ''}
                    </p>
                    <div className="entry-footer">
                      {entry.mood && (
                        <span className="entry-mood">{entry.mood}</span>
                      )}
                      <span className="entry-privacy">
                        {entry.public ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JournalPage; 