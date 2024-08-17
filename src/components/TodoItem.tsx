import React, { useState } from 'react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  editTodo?: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (editTodo && isEditing && newText.trim()) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className='item__container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
      {isEditing ? (
        <input
          type="text"
          className='edit__input'
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
        />
      ) : (
        <span className='edit__span' onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}
      {editTodo && <button className='btn' onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>}
    </div>
  );
};

export default TodoItem;
