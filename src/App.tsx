import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css'

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  return (
    <div className='app__container'>
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <div style={{ display: 'flex', justifyContent: 'space-between',
      flexWrap: 'wrap', marginTop: '20px', gap: '30px', padding: '0 40px'}}>
        <TodoList title="All Tasks" todos={todos} toggleTodo={toggleTodo} />
        <TodoList title="Completed" todos={todos.filter(todo => todo.completed)} toggleTodo={toggleTodo} />
        <TodoList title="Not Completed" todos={todos.filter(todo => !todo.completed)} toggleTodo={toggleTodo} editTodo={editTodo} />
      </div>
    </div>
  );
};

export default App;
