import React from 'react';
import { Calendar } from './components/Calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { UpcomingEvents } from './components/UpcomingEvents';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Modern Calendar</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <Calendar />
          <aside className="space-y-6">
            <UpcomingEvents />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;