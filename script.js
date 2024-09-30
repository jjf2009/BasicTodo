// Fetch tasks from localStorage or initialize with an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Select DOM elements
const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');

// Display tasks when the page loads
function displayTasks() {
    todoList.innerHTML = '';  // Clear the list

    tasks.forEach((task, index) => {
        // Create a new list item
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            ${task.text}
            <div>
                <button class="done-btn" onclick="markAsDone(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        displayTasks();
        newTaskInput.value = ''; // Clear input
    }
}

// Mark a task as done/undone
function markAsDone(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    displayTasks();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding a task
addTaskBtn.addEventListener('click', addTask);

// Display tasks on page load
displayTasks();
