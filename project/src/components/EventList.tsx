import React from 'react';
import { format } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import { useEventStore } from '../store/eventStore';
import { Event } from '../types';

interface EventListProps {
  date: Date;
  onEditEvent?: (event: Event) => void;
}

export const EventList: React.FC<EventListProps> = ({ date, onEditEvent }) => {
  const events = useEventStore((state) => state.getEventsByDate(date));
  const deleteEvent = useEventStore((state) => state.deleteEvent);

  if (events.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No events scheduled for this date
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="border-l-4 border-blue-500 pl-4 py-2"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.time}</p>
              {event.description && (
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              )}
              {event.type !== 'text' && event.mediaUrl && (
                <div className="mt-2">
                  {event.type === 'image' ? (
                    <img
                      src={event.mediaUrl}
                      alt={event.title}
                      className="max-w-full h-auto rounded"
                    />
                  ) : (
                    <video
                      src={event.mediaUrl}
                      controls
                      className="max-w-full rounded"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              {onEditEvent && (
                <button
                  onClick={() => onEditEvent(event)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => deleteEvent(event.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};