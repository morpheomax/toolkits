import { useState, useEffect } from 'react';
import { TaskCard } from './Tasks/TaskCard';
import { TaskForm } from './Tasks/TaskForm';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "flowbite-react";

export const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, { ...task, id: Date.now(), isCompleted: false }]);
    }
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const handleEdit = (id) => {
    setEditingTask(tasks.find(task => task.id === id));
  };

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(tasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'tasks.xlsx');
  };

  const exportToTXT = () => {
    const txtContent = tasks.map(task => `Title: ${task.title}, Due Date: ${task.dueDate}, Completed: ${task.isCompleted}`).join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'tasks.txt');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      <TaskForm onSubmit={addTask} initialTask={editingTask} />
      <div className="mt-6 space-y-4">
        {tasks
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
            />
          ))}
      </div>
      <div className="mt-6 flex space-x-2">
        <Button onClick={exportToXLSX} color="blue">Exportar XLSX</Button>
        <Button onClick={exportToTXT} color="gray">Exportar TXT</Button>
      </div>
    </div>
  );
};
