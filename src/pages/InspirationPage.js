import React, { useState } from 'react';
import Layout from '../components/Layout';

const InspirationPage = () => {
  const [quotes, setQuotes] = useState([
    { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { id: 2, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { id: 3, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { id: 4, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { id: 5, text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
  ]);
  
  const [newQuote, setNewQuote] = useState({ text: '', author: '' });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuote(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuote.text && newQuote.author) {
      setQuotes([...quotes, { id: Date.now(), ...newQuote }]);
      setNewQuote({ text: '', author: '' });
    }
  };
  
  return (
    <Layout>
      <div className="inspiration-container">
        <h1>Inspiration Wall</h1>
        
        <div className="quotes-grid">
          {quotes.map(quote => (
            <div key={quote.id} className="quote-card">
              <p className="quote-text">"{quote.text}"</p>
              <p className="quote-author">- {quote.author}</p>
            </div>
          ))}
        </div>
        
        <div className="add-quote-form">
          <h2>Add New Inspiration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="text">Quote</label>
              <textarea
                id="text"
                name="text"
                value={newQuote.text}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newQuote.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn">Add Quote</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default InspirationPage; 