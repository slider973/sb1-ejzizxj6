import { useState } from 'react';
import { Filter } from 'lucide-react';
import type { TaskStatus } from '../../types/task';

interface TaskFiltersProps {
  onFilterChange: (status: TaskStatus | 'all') => void;
  onSortChange: (sort: 'due_date' | 'created_at') => void;
}

export function TaskFilters({ onFilterChange, onSortChange }: TaskFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <select
              onChange={(e) => onFilterChange(e.target.value as TaskStatus | 'all')}
              className="w-full text-sm border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              onChange={(e) => onSortChange(e.target.value as 'due_date' | 'created_at')}
              className="w-full text-sm border-gray-300 rounded-md"
            >
              <option value="due_date">Due Date</option>
              <option value="created_at">Created Date</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}