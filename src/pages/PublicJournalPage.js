import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const PublicJournalPage = () => {
  const [publicEntries, setPublicEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // In a real app, we would fetch from API
    // Simulating with some sample data
    const sampleEntries = [
      {
        id: 1,
        title: "My Journey to Mindfulness",
        content: "Today I started my mindfulness practice. I spent 10 minutes in silence, focusing on my breath...",
        author: "anonymous123",
        date: "2023-05-02",
        tags: ["mindfulness", "meditation", "beginners"]
      },
      {
        id: 2,
        title: "Thoughts on Remote Work",
        content: "After working remotely for two years, I've learned that balance is essential...",
        author: "workfromhome22",
        date: "2023-05-01",
        tags: ["work", "productivity", "balance"]
      },
      {
        id: 3,
        title: "My Reading Journey",
        content: "I've finished 10 books this year so far. My favorite has been 'Atomic Habits' because...",
        author: "bookworm42",
        date: "2023-04-28",
        tags: ["reading", "books", "habits"]
      }
    ];
    
    setPublicEntries(sampleEntries);
  }, []);
  
  const filterEntries = () => {
    if (filter === 'all') {
      return publicEntries;
    }
    
    return publicEntries.filter(entry => 
      entry.tags.includes(filter.toLowerCase())
    );
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const allTags = [...new Set(
    publicEntries.flatMap(entry => entry.tags)
  )];
  
  return (
    <Layout>
      <div className="public-journal-container">
        <h1>Public Journals</h1>
        
        <div className="filter-container">
          <label htmlFor="tag-filter">Filter by tag:</label>
          <select 
            id="tag-filter" 
            value={filter} 
            onChange={handleFilterChange}
          >
            <option value="all">All Entries</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        
        <div className="journal-entries">
          {filterEntries().length > 0 ? (
            filterEntries().map(entry => (
              <div key={entry.id} className="journal-entry">
                <h3 className="entry-title">{entry.title}</h3>
                <div className="entry-meta">
                  <span className="entry-author">By: {entry.author}</span>
                  <span className="entry-date">Date: {entry.date}</span>
                </div>
                <p className="entry-content">{entry.content}</p>
                <div className="entry-tags">
                  {entry.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No entries found with the selected filter.</p>
          )}
        </div>
        
        <div className="share-journal-cta">
          <h2>Want to share your thoughts?</h2>
          <p>Make your journal entries public when writing in your personal journal.</p>
          <button className="btn">Go to My Journal</button>
        </div>
      </div>
    </Layout>
  );
};

export default PublicJournalPage; 