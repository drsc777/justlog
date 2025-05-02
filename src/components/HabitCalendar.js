import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import '../styles/HabitCalendar.css';

const HabitCalendar = ({ completions, onDateClick }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate days of week for header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Convert string dates to Date objects for comparison
  const completionDates = completions.map(date => new Date(date));
  
  const isDateCompleted = (date) => {
    return completionDates.some(completionDate => isSameDay(completionDate, date));
  };
  
  const handleDateClick = (date) => {
    if (onDateClick) {
      onDateClick(format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="habit-calendar">
      <div className="calendar-header">
        <h3>{format(today, 'MMMM yyyy')}</h3>
      </div>
      
      <div className="calendar-days-header">
        {daysOfWeek.map(day => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="calendar-day empty"></div>
        ))}
        
        {/* Calendar days */}
        {daysInMonth.map(day => (
          <div
            key={format(day, 'yyyy-MM-dd')}
            className={`calendar-day ${isDateCompleted(day) ? 'completed' : ''} ${isSameDay(day, today) ? 'today' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
        
        {/* Empty cells for days after the last of the month */}
        {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
          <div key={`empty-end-${index}`} className="calendar-day empty"></div>
        ))}
      </div>
    </div>
  );
};

export default HabitCalendar; 