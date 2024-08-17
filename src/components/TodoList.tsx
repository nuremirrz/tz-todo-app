import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../App';
import '../App.css'

interface TodoListProps {
  title: string;
  todos: Todo[];
  toggleTodo: (id: number) => void;
  editTodo?: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ title, todos, toggleTodo, editTodo }) => {const TodoList: React.FC<TodoListProps> = ({ title, todos, toggleTodo, editTodo }) => {
  return (
    <div className='list__container' style={{ maxWidth: '30%', border: '2px solid #96361c', padding: '0 30px' }}>
      <div className='tasks__container' style={{ overflowY: 'auto', maxHeight: '150px' }}>
      <h3>{title}</h3>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} editTodo={editTodo} />
        ))}
      </div>
    </div>
  );
};
  return (
    <div className='list__container' style={{ maxWidth: '30%', border: '2px solid #96361c', padding: '0 30px', overflowY: 'auto', maxHeight: '150px' }}>
      <h3>{title}</h3>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} editTodo={editTodo} />
      ))}
    </div>
  );
};

export default TodoList;
