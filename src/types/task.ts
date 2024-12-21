export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'todo' | 'in_progress' | 'completed';
  assigned_to: string;
  created_by: string;
  created_at: string;
}

export type TaskStatus = Task['status'];