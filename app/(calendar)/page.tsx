// app/calendar-control/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarControl() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calWeekDays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const calMonthName = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  // Functions to navigate the calendar
  const navigateToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const navigateToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Function to render the calendar days
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];
    
    // Padding days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`pad-${i}`} className="calendar-day pad"></div>);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div key={day} className={cn("calendar-day", day === currentDate.getDate() && "current-day")}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Button className="text-black" size="sm" onClick={navigateToPreviousMonth}><ChevronLeft /></Button>
        <div className="month-txt">{calMonthName[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
        <Button className="text-black" size="sm" onClick={navigateToNextMonth}><ChevronRight /></Button>
      </div>
      <div className="calendar-body">
        {calWeekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
export default CalendarControl;