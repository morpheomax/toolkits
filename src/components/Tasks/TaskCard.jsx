/* eslint-disable react/prop-types */
import { Button, Checkbox } from 'flowbite-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { id, title, dueDate, isCompleted } = task;

  const timeRemaining = formatDistanceToNow(parseISO(dueDate), { addSuffix: true });
  const isOverdue = new Date(dueDate) < new Date();
  const remainingDays = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  const getStatusColor = () => {
    if (isCompleted) return 'border-green-500';
    if (isOverdue) return 'border-red-500';
    if (remainingDays <= 3) return 'border-yellow-500';
    return 'border-gray-300';
  };

  return (
    <div className={`p-4 mb-4 bg-white rounded-lg shadow-lg ${getStatusColor()} border-2`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Vence: {new Date(dueDate).toLocaleDateString()} {new Date(dueDate).toLocaleTimeString()}</p>
      <p className="text-gray-600">Tiempo restante: {timeRemaining}</p>
      <div className="flex items-center mt-2">
        <Checkbox id={`complete-${id}`} checked={isCompleted} onChange={() => onToggleComplete(id)} />
        <label htmlFor={`complete-${id}`} className="ml-2 text-gray-600">Completed</label>
      </div>
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => onEdit(id)}>Edit</Button>
        <Button onClick={() => onDelete(id)} color="failure">Delete</Button>
      </div>
    </div>
  );
};
