
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const API_URL = 'http://localhost:3000/todos';

// Function to fetch and render all to-do items (READ)
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todoList.innerHTML = ''; // Clear the list
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo._id;
      li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="actions">
          <button class="complete-btn">✔</button>
          <button class="edit-btn">✎</button>
          <button class="delete-btn">✖</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Handle form submission to add a new to-do (CREATE)
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text === '') return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    todoInput.value = '';
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.error('Error adding todo:', error);
  }
});

// Handle list clicks for completing, editing or deleting a to-do (UPDATE & DELETE)
todoList.addEventListener('click', async (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains('complete-btn')) {
    // UPDATE operation (complete)
    const completed = !li.classList.contains('completed');
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  } else if (e.target.classList.contains('delete-btn')) {
    // DELETE operation
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  } else if (e.target.classList.contains('edit-btn')) {
    // Enable edit mode
    const textSpan = li.querySelector('.todo-text');
    const actionsDiv = li.querySelector('.actions');
    const currentText = textSpan.textContent;

    // Create a new input field and a save button
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.className = 'edit-input';
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    // Replace the text and action buttons with the input field and save button
    li.innerHTML = '';
    li.appendChild(editInput);
    li.appendChild(saveBtn);
    editInput.focus();

    // Handle the save operation
    saveBtn.addEventListener('click', async () => {
      const newText = editInput.value.trim();
      if (newText === '') return;

      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newText }),
        });
        fetchTodos(); // Refresh the list to show the updated item
      } catch (error) {
        console.error('Error saving todo:', error);
      }
    });

    // Optional: Allow saving with the Enter key
    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveBtn.click();
      }
    });
  }
});

// Initial fetch to load todos when the page loads
fetchTodos();