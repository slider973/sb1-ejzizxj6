import { format } from 'date-fns';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { updateTaskStatus } from '../../lib/tasks';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

const statusIcons = {
  todo: AlertCircle,
  inProgress: Clock,
  completed: CheckCircle,
};

const statusColors = {
  todo: 'text-red-500',
  inProgress: 'text-yellow-500',
  completed: 'text-green-500',
};

export function TaskCard({ task }: TaskCardProps) {
  const Icon = statusIcons[task.status];

  const handleStatusChange = async (newStatus: Task['status']) => {
    try {
      await updateTaskStatus(task.id, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <Icon className={`w-5 h-5 ${statusColors[task.status]}`} />
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className="rounded border-gray-300 text-sm"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}