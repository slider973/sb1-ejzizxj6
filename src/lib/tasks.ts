import { supabase } from './supabase';
import type { Task } from '../types/task';

export async function createTask(task: Omit<Task, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...task }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('assigned_to', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateTaskStatus(taskId: string, status: Task['status']) {
  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId);

  if (error) throw error;
}