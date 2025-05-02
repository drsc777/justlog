import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const MessageBoardPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', content: '' });
  
  useEffect(() => {
    // In a real app, we would fetch from API
    // Simulating with some sample data
    const sampleMessages = [
      {
        id: 1,
        name: "John",
        content: "This app has helped me establish a daily journaling habit. Thank you!",
        timestamp: "2023-05-02T14:30:00Z"
      },
      {
        id: 2,
        name: "Sarah",
        content: "Would love to see more meditation features in future updates.",
        timestamp: "2023-05-01T09:45:00Z"
      },
      {
        id: 3,
        name: "Anonymous",
        content: "The pomodoro timer has increased my productivity significantly.",
        timestamp: "2023-04-29T16:20:00Z"
      }
    ];
    
    setMessages(sampleMessages);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.name && newMessage.content) {
      const message = {
        id: Date.now(),
        name: newMessage.name,
        content: newMessage.content,
        timestamp: new Date().toISOString()
      };
      
      setMessages([message, ...messages]);
      setNewMessage({ name: '', content: '' });
    }
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <Layout>
      <div className="message-board-container">
        <h1>Message Board</h1>
        
        <div className="new-message-form">
          <h2>Leave a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name (or Anonymous)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMessage.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Message</label>
              <textarea
                id="content"
                name="content"
                value={newMessage.content}
                onChange={handleInputChange}
                placeholder="Share your thoughts, feedback, or questions"
                required
              />
            </div>
            
            <button type="submit" className="btn">Post Message</button>
          </form>
        </div>
        
        <div className="message-list">
          <h2>Community Messages</h2>
          {messages.length === 0 ? (
            <p>No messages yet. Be the first to leave a message!</p>
          ) : (
            messages.map(message => (
              <div key={message.id} className="message-card">
                <div className="message-header">
                  <h3 className="message-author">{message.name || 'Anonymous'}</h3>
                  <span className="message-time">{formatDate(message.timestamp)}</span>
                </div>
                <p className="message-content">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MessageBoardPage; 