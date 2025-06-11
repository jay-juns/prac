// app/(calendar)/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarControl() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  const translations = {
    ko: {
      weekdays: [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
      ],
      months: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
    },
    en: {
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  } as const;

  const calWeekDays = translations[lang].weekdays;
  const calMonthName = translations[lang].months;

  // 언어 변경 시 html 의 lang 속성 업데이트
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 달력을 이전 달로 이동
  const navigateToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // 달력을 다음 달로 이동
  const navigateToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // 달력의 날짜를 렌더링
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];
    
    // 이전 달의 빈 날짜 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`pad-${i}`} className="calendar-day pad"></div>);
    }

    // 이번 달 날짜
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
        <Button
          className="text-black"
          size="sm"
          onClick={navigateToPreviousMonth}
        >
          <ChevronLeft />
        </Button>
        <div className="month-txt">
          {calMonthName[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <Button
          className="text-black"
          size="sm"
          onClick={navigateToNextMonth}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="ml-2"
          onClick={() => setLang(prev => (prev === 'ko' ? 'en' : 'ko'))}
        >
          {lang === 'ko' ? 'English' : '한국어'}
        </Button>
      </div>
      <div className="calendar-body">
        {calWeekDays.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
export default CalendarControl;
