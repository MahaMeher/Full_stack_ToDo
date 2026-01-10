import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getTasks();
      if (response.success && response.data) {
        setTasks(response.data!);
      } else {
        const errorMsg = response.error || 'Failed to fetch tasks';
        setError(errorMsg);
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (taskData: TaskFormData) => {
    try {
      const response = await apiClient.createTask(taskData);
      if (response.success && response.data) {
        setTasks(prev => [...prev, response.data!]);
        toast({
          title: 'Success',
          description: 'Task created successfully',
        });
        return { success: true, task: response.data! };
      } else {
        const errorMsg = response.error || 'Failed to create task';
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return {
        success: false,
        error: errorMsg
      };
    }
  };

  // Update an existing task
  const updateTask = async (id: string, taskData: Partial<TaskFormData>) => {
    try {
      const response = await apiClient.updateTask(id, taskData);
      if (response.success && response.data) {
        setTasks(prev => prev.map(task => task.id === id ? response.data! : task));
        toast({
          title: 'Success',
          description: 'Task updated successfully',
        });
        return { success: true, task: response.data! };
      } else {
        const errorMsg = response.error || 'Failed to update task';
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return {
        success: false,
        error: errorMsg
      };
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      const response = await apiClient.deleteTask(id);
      if (response.success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        toast({
          title: 'Success',
          description: 'Task deleted successfully',
        });
        return { success: true };
      } else {
        const errorMsg = response.error || 'Failed to delete task';
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return {
        success: false,
        error: errorMsg
      };
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) {
      const errorMsg = 'Task not found';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return { success: false, error: errorMsg };
    }

    try {
      const response = await apiClient.toggleTaskCompletion(id);
      if (response.success && response.data) {
        setTasks(prev => prev.map(task =>
          task.id === id ? response.data! : task
        ));
        toast({
          title: 'Success',
          description: `Task marked as ${!task.completed ? 'complete' : 'incomplete'}`,
        });
        return { success: true, task: response.data! };
      } else {
        const errorMsg = response.error || 'Failed to update task';
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      return {
        success: false,
        error: errorMsg
      };
    }
  };

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
}