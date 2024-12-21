import { format } from 'date-fns';
import { Calendar, CheckCircle } from 'lucide-react';
import type { FamilyEvent } from '../../types/event';
import type { Task } from '../../types/task';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  events: FamilyEvent[];
  tasks: Task[];
}

export function CalendarDay({ date, isCurrentMonth, events, tasks }: CalendarDayProps) {
  const dayClasses = `
    min-h-24 p-2 border border-gray-200
    ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
  `;

  return (
    <div className={dayClasses}>
      <div className="text-right">
        <span className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
          {format(date, 'd')}
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {events.map(event => (
          <div
            key={event.id}
            className="flex items-center text-xs bg-blue-50 text-blue-700 rounded px-1 py-0.5 truncate"
          >
            <Calendar className="w-3 h-3 mr-1" />
            {event.title}
          </div>
        ))}
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center text-xs bg-green-50 text-green-700 rounded px-1 py-0.5 truncate"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}