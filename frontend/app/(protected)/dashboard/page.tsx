'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useTask } from '@/hooks/use-task';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/task/task-card';
import { TaskModal } from '@/components/task/task-modal';
import { TaskListSkeleton } from '@/components/task/task-skeleton';
import { TaskEmptyState } from '@/components/task/task-empty-state';
import { useThemeContext } from '@/components/theme/provider';
import { ThemeToggle } from '@/components/theme/toggle';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleTaskCompletion } = useTask();
  const { theme, toggleTheme } = useThemeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleLogout = async () => {
    await logout();
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: any) => {
    let result;

    if (editingTask) {
      result = await updateTask(editingTask.id, taskData);
    } else {
      result = await createTask(taskData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleToggleTask = async (id: string) => {
    await toggleTaskCompletion(id);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || user?.email || 'User'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleAddTask}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
          Error: {error}
        </div>
      )}

      {loading ? (
        <TaskListSkeleton count={5} />
      ) : tasks.length === 0 ? (
        <TaskEmptyState onAddTask={handleAddTask} />
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}