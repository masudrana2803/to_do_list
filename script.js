// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selection ---
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const todoListContainer = document.getElementById('todoListContainer');
    const doneCounter = document.getElementById('doneCounter');
    const totalCounter = document.getElementById('totalCounter');
    const errorMessage = document.getElementById('errorMessage');

    // --- Functions ---

    /**
     * Updates the counter display with the current number of total and completed tasks.
     */
    const updateCounters = () => {
        const totalTasks = document.querySelectorAll('.single-todo-item').length;
        const completedTasks = document.querySelectorAll('.completed-task').length;
        totalCounter.textContent = totalTasks;
        doneCounter.textContent = completedTasks;
    };

    /**
     * Creates and appends a new to-do item to the list.
     * @param {string} taskText - The text content for the new task.
     */
    const createTodoItem = (taskText) => {
        // Create the main container for the to-do item
        const todoItem = document.createElement('div');
        todoItem.className = 'single-todo-item';

        // Create the text input for the task
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = taskText;
        textInput.disabled = true; // Initially disabled

        // Create the Edit button
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = '<i class="fas fa-pen-to-square"></i>';
        editButton.addEventListener('click', () => {
            // Enable or disable the input field
            textInput.disabled = !textInput.disabled;
            if (!textInput.disabled) {
                textInput.focus();
                editButton.innerHTML = '<i class="fas fa-save"></i>'; // Change icon to save
            } else {
                editButton.innerHTML = '<i class="fas fa-pen-to-square"></i>'; // Change back to edit
            }
        });

        // Create the Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteButton.parentElement.remove();
            updateCounters(); // Update counters after deleting
        });

        // Create the Done button
        const doneButton = document.createElement('button');
        doneButton.className = 'done-button';
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        doneButton.addEventListener('click', () => {
            todoItem.classList.toggle('completed-task');
            updateCounters(); // Update counters after marking as done/undone
        });

        // Append all parts to the main to-do item container
        todoItem.appendChild(textInput);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(doneButton);

        // Add the new to-do item to the list
        todoListContainer.appendChild(todoItem);
    };

    /**
     * Handles the logic for adding a new task.
     */
    const handleAddTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            // Show an error message if the input is empty
            errorMessage.textContent = 'Please write something!';
            // Hide the message after 3 seconds
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 3000);
            return; // Stop the function
        }

        // Clear any previous error messages
        errorMessage.textContent = '';
        
        // Create the new to-do item
        createTodoItem(taskText);

        // Clear the input field and update counters
        taskInput.value = '';
        updateCounters();
    };

    // --- Event Listeners ---

    // Add task when the '+' button is clicked
    addButton.addEventListener('click', handleAddTask);

    // Add task when the 'Enter' key is pressed in the input field
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // --- Initial State ---
    // Pre-populate the list with a couple of example tasks
    // createTodoItem("Buy groceries");
    // createTodoItem("Finish project report");
    updateCounters();

});
