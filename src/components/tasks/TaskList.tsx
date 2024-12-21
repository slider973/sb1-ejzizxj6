import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserTasks } from '../../lib/tasks';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types/task';

interface TaskListProps {
  statusFilter: TaskStatus | 'all';
  sortBy: 'due_date' | 'created_at';
}

export function TaskList({ statusFilter, sortBy }: TaskListProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;
      try {
        const userTasks = await getUserTasks(user.id);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [user]);

  const filteredAndSortedTasks = tasks
    .filter(task => statusFilter === 'all' ? true : task.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a[sortBy]);
      const dateB = new Date(b[sortBy]);
      return dateA.getTime() - dateB.getTime();
    });

  if (loading) return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-4">
      {filteredAndSortedTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {filteredAndSortedTasks.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {statusFilter === 'all' 
            ? 'No tasks found' 
            : `No ${statusFilter} tasks found`}
        </p>
      )}
    </div>
  );
}