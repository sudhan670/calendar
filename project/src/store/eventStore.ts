import { create } from 'zustand';
import { Event, EventStore } from '../types';
import { isSameDay } from 'date-fns';

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  
  addEvent: (event) => {
    set((state) => ({
      events: [...state.events, { ...event, id: crypto.randomUUID() }],
    }));
  },
  
  updateEvent: (id, updatedEvent) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    }));
  },
  
  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    }));
  },
  
  getEventsByDate: (date) => {
    return get().events.filter((event) => isSameDay(new Date(event.date), date));
  },
}));