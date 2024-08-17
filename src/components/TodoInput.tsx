import React, { useState } from 'react'

interface TodoInputProps {
  addTodo: (text: string) => void
}

const TodoInput: React.FC<TodoInputProps> = ({addTodo}) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('')
    }
  }

  return (
    <form 
      className='input__form'
      onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder='Enter Todo' 
      />
      <button className='btn' type='submit'>Add Todo</button>
    </form>
  )
}

export default TodoInput