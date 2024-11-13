import React from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { Event } from '../types';

interface CalendarGridProps {
  daysInMonth: Date[];
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  getEventsForDate: (date: Date) => Event[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth,
  currentDate,
  selectedDate,
  onSelectDate,
  getEventsForDate,
}) => {
  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date) => {
          const dayEvents = getEventsForDate(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isCurrentMonth = isSameMonth(date, currentDate);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={`
                aspect-square p-2 rounded-lg relative
                ${isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-400'}
                ${isSelected ? 'bg-blue-100 hover:bg-blue-200' : ''}
              `}
            >
              <span className="text-sm">{format(date, 'd')}</span>
              {dayEvents.length > 0 && (
                <div className="absolute bottom-1 right-1 left-1">
                  <div className="flex gap-1 justify-center">
                    {dayEvents.slice(0, 3).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-1 h-1 rounded-full bg-blue-500"
                      />
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};