/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { format, parseISO } from 'date-fns';

export const TaskForm = ({ onSubmit, initialTask = {} }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? format(parseISO(initialTask.dueDate), 'yyyy-MM-dd\'T\'HH:mm') : ''
  );

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDueDate(
        initialTask.dueDate ? format(parseISO(initialTask.dueDate), 'yyyy-MM-dd\'T\'HH:mm') : ''
      );
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, dueDate: new Date(dueDate).toISOString(), id: initialTask?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tarea"
        required
      />
      <TextInput
        type="datetime-local"
        value={dueDate || ''}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Vencimiento"
        required
      />
      <Button type="submit">Guardar</Button>
    </form>
  );
};
