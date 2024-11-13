export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  notified?: boolean;
}

export interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: Date) => Event[];
}