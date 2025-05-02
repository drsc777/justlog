import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';
import '../styles/DataExportPage.css';

const DataExportPage = () => {
  const { currentUser } = useAuth();
  const [exportFormat, setExportFormat] = useState('json');
  const [exportType, setExportType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Mock data for demonstration
  const mockData = {
    journals: [
      { id: 1, title: 'First Entry', content: 'This is my first journal entry', date: '2024-04-22', mood: 'happy' },
      { id: 2, title: 'Second Entry', content: 'Another day, another log', date: '2024-04-21', mood: 'calm' }
    ],
    todos: [
      { id: 1, text: 'Read a book', completed: false, priority: 'high', deadline: '2024-04-23' },
      { id: 2, text: 'Exercise', completed: true, priority: 'medium', deadline: '2024-04-21' }
    ],
    habits: [
      { id: 1, name: 'Reading', completions: ['2024-04-20', '2024-04-21'] },
      { id: 2, name: 'Exercise', completions: ['2024-04-19', '2024-04-21'] }
    ],
    moods: [
      { id: 1, date: '2024-04-22', mood: 'happy', notes: 'Had a great day!' },
      { id: 2, date: '2024-04-21', mood: 'calm', notes: 'Relaxing weekend' }
    ]
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      let dataToExport = {};
      
      // Determine which data to export
      if (exportType === 'all') {
        dataToExport = mockData;
      } else {
        dataToExport = { [exportType]: mockData[exportType] };
      }
      
      // Create the export file
      let dataStr;
      let fileExtension;
      
      if (exportFormat === 'json') {
        // Format the JSON with indentation for readability
        dataStr = JSON.stringify(dataToExport, null, 2);
        fileExtension = 'json';
      } else {
        // Simple markdown conversion
        dataStr = convertToMarkdown(dataToExport);
        fileExtension = 'md';
      }
      
      // Create and download a file
      const blob = new Blob([dataStr], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `justlog_export_${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
      link.href = url;
      link.click();
      
      setIsExporting(false);
      setExportSuccess(true);
      
      // Reset success message after a while
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 1500);
  };

  const convertToMarkdown = (data) => {
    let md = `# Just Log Data Export\n\nExported on: ${new Date().toLocaleDateString()}\n\n`;
    
    // Add sections based on what data is available
    if (data.journals) {
      md += `## Journals\n\n`;
      data.journals.forEach(journal => {
        md += `### ${journal.title} (${journal.date})\n\n`;
        md += `Mood: ${journal.mood}\n\n`;
        md += `${journal.content}\n\n---\n\n`;
      });
    }
    
    if (data.todos) {
      md += `## To-Do Items\n\n`;
      data.todos.forEach(todo => {
        md += `- [${todo.completed ? 'x' : ' '}] ${todo.text} - Priority: ${todo.priority}`;
        if (todo.deadline) md += ` (Due: ${todo.deadline})`;
        md += `\n`;
      });
      md += `\n`;
    }
    
    if (data.habits) {
      md += `## Habits\n\n`;
      data.habits.forEach(habit => {
        md += `### ${habit.name}\n\n`;
        md += `Completions: ${habit.completions.join(', ')}\n\n`;
      });
    }
    
    if (data.moods) {
      md += `## Mood Tracking\n\n`;
      data.moods.forEach(mood => {
        md += `- **${mood.date}**: ${mood.mood} - ${mood.notes}\n`;
      });
    }
    
    return md;
  };

  return (
    <Layout>
      <div className="data-export-container">
        <div className="data-export-header">
          <h1>Data Export</h1>
          <p>Download your data to keep a backup or import into other applications.</p>
        </div>
        
        <div className="data-export-content pixel-border">
          <div className="export-options">
            <div className="option-group">
              <h2>What to Export</h2>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="exportType" 
                    value="all" 
                    checked={exportType === 'all'} 
                    onChange={() => setExportType('all')}
                  />
                  All Data
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="exportType" 
                    value="journals" 
                    checked={exportType === 'journals'} 
                    onChange={() => setExportType('journals')}
                  />
                  Journals Only
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="exportType" 
                    value="habits" 
                    checked={exportType === 'habits'} 
                    onChange={() => setExportType('habits')}
                  />
                  Habits Only
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="exportType" 
                    value="todos" 
                    checked={exportType === 'todos'} 
                    onChange={() => setExportType('todos')}
                  />
                  To-Do Lists Only
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="exportType" 
                    value="moods" 
                    checked={exportType === 'moods'} 
                    onChange={() => setExportType('moods')}
                  />
                  Mood Tracking Only
                </label>
              </div>
            </div>
            
            <div className="option-group">
              <h2>Export Format</h2>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="exportFormat" 
                    value="json" 
                    checked={exportFormat === 'json'} 
                    onChange={() => setExportFormat('json')}
                  />
                  JSON (for importing to other applications)
                </label>
                
                <label>
                  <input 
                    type="radio" 
                    name="exportFormat" 
                    value="markdown" 
                    checked={exportFormat === 'markdown'} 
                    onChange={() => setExportFormat('markdown')}
                  />
                  Markdown (for human-readable files)
                </label>
              </div>
            </div>
            
            <div className="export-action">
              <button 
                className="btn export-btn" 
                onClick={handleExport}
                disabled={isExporting || !currentUser}
              >
                {isExporting ? 'Preparing Export...' : 'Export Data'}
              </button>
              
              {!currentUser && (
                <p className="export-warning">You need to be logged in to export data.</p>
              )}
              
              {exportSuccess && (
                <p className="export-success">Export successful! File downloaded.</p>
              )}
            </div>
          </div>
          
          <div className="export-info">
            <h3>About Data Export</h3>
            <ul>
              <li>Your data is exported directly from your browser to your device.</li>
              <li>JSON format contains the complete data structure and is ideal for backups.</li>
              <li>Markdown format creates a readable document that can be viewed in any text editor.</li>
              <li>Data exports include all your content up to the current date.</li>
              <li>You can use the JSON export to import your data into Just Log on another device.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataExportPage; 