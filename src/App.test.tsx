import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('Add New Todo and Check it in list "All Tasks"', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Enter Todo');
  const addButton = screen.getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(addButton);

  const allTasksList = screen.getByText('All Tasks').closest('div');
  const notCompletedList = screen.getByText('Not Completed').closest('div');

  expect(allTasksList).toHaveTextContent('Новая задача');
  expect(notCompletedList).toHaveTextContent('Новая задача');
});



test('Check Todo status(Completed/Not Completed))', () => {
  render(<App />);

  // Добавляем новую задачу
  const input = screen.getByPlaceholderText('Enter Todo');
  const addButton = screen.getByText('Add Todo');
  fireEvent.change(input, { target: { value: 'Задача для теста' } });
  fireEvent.click(addButton);

  // Ищем задачу в списке "Not Completed"
  const notCompletedList = screen.getByText('Not Completed').closest('div');
  if (notCompletedList) {
    const taskItems = within(notCompletedList).getAllByText('Задача для теста');
    expect(taskItems[0]).toBeInTheDocument();
  } else {
    throw new Error('List with title "Not Completed" not found');
  }

  // Переключаем состояние задачи на "выполнено"
  if (notCompletedList) {
    fireEvent.click(within(notCompletedList).getAllByText('Задача для теста')[0]);
  }

  // Проверяем, что задача теперь в списке "Completed"
  const completedList = screen.getByText('Completed').closest('div');
  if (completedList) {
    expect(within(completedList).getByText('Задача для теста')).toBeInTheDocument();
  } else {
    throw new Error('List with title "Completed" not found');
  }

  // Переключаем состояние задачи обратно на "не выполнено"
  if (completedList) {
    fireEvent.click(within(completedList).getByText('Задача для теста'));
  }

  // Проверяем, что задача теперь снова в списке "Not Completed"
  if (notCompletedList) {
    expect(within(notCompletedList).getByText('Задача для теста')).toBeInTheDocument();
  } else {
    throw new Error('List with title "Not Completed" not found');
  }
});

test('Edit Todo', () => {
  render(<App />);

  // Добавляем новую задачу
  const input = screen.getByPlaceholderText('Enter Todo');
  const addButton = screen.getByText('Add Todo');
  fireEvent.change(input, { target: { value: 'Задача для редактирования' } });
  fireEvent.click(addButton);

  // Находим контейнер "Not Completed"
  const notCompletedHeader = screen.getByText('Not Completed');
  const notCompletedContainer = notCompletedHeader.closest('div');
  if (!notCompletedContainer) {
    throw new Error('Не удалось найти контейнер "Not Completed"');
  }

  // Находим задачу в списке "Not Completed"
  const taskItem = within(notCompletedContainer).getByText('Задача для редактирования');
  expect(taskItem).toBeInTheDocument();

  // Нажимаем на кнопку редактирования
  const editButton = within(notCompletedContainer).getByText('Edit');
  fireEvent.click(editButton);

  // Меняем текст задачи
  const inputEdit = within(notCompletedContainer).getByRole('textbox');
  fireEvent.change(inputEdit, { target: { value: 'Обновленная задача' } });
  
  // Нажимаем кнопку сохранения
  const saveButton = within(notCompletedContainer).getByText('Save');
  fireEvent.click(saveButton);

  // Проверяем, что отредактированная задача есть в списке "Not Completed"
  const updatedTaskItem = within(notCompletedContainer).getByText('Обновленная задача');
  expect(updatedTaskItem).toBeInTheDocument();
  
  // Проверяем, что задача не осталась в списке "All Tasks" (если это важно)
  const allTasksHeader = screen.getByText('All Tasks');
  const allTasksContainer = allTasksHeader.closest('div');
  if (!allTasksContainer) {
    throw new Error('Не удалось найти контейнер "All Tasks"');
  }
  const taskInAllTasks = within(allTasksContainer).queryByText('Задача для редактирования');
  expect(taskInAllTasks).not.toBeInTheDocument();
});
