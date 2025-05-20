import React, { useState } from 'react';
import '../../styles/dateCard.css';

interface DateCardProps {
  className?: string;
  onDateSelect?: (date: Date) => void;
}

const DateCard: React.FC<DateCardProps> = ({ className = '', onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = [
    { label: 'S', key: 'sun' },
    { label: 'M', key: 'mon' },
    { label: 'T', key: 'tue' },
    { label: 'W', key: 'wed' },
    { label: 'T', key: 'thu' },
    { label: 'F', key: 'fri' },
    { label: 'S', key: 'sat' }
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      const isSelected = selectedDate && 
        day === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`date-card ${className}`}>
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-button">
          &lt;
        </button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth} className="calendar-nav-button">
          &gt;
        </button>
      </div>
      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day.key} className="calendar-day-name">
            {day.label}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default DateCard; 