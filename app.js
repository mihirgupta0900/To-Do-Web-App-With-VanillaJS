// Define the UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const spanEl = document.querySelector('.item');

//  Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from ls when we reload the page
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Display each stored list item in the UI when reloaded
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item'
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.className = 'check'
        label.appendChild(input);
        const span = document.createElement('span');
        span.className = 'task';
        span.appendChild(document.createTextNode(task));
        label.appendChild(span);
        li.appendChild(label);
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);


        // // Append li to ul
        taskList.appendChild(li);
    })
}



// add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    const li = document.createElement('li');
        li.className = 'collection-item'
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        label.appendChild(input);
        const span = document.createElement('span');
        span.className = 'task';
        span.appendChild(document.createTextNode(taskInput.value));
        label.appendChild(span);
        li.appendChild(label);
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);

        // // Append li to ul
        taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault()
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from ls
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear Tasks
function clearTasks() {
    taskList.innerHTML = '';

    // Faster
    // while(taskList.firstChild) {
    //     taskList.removeChild(taskList.firstChild);
    // }

    // Clear from ls
    clearTasksFromLocalStorage();
}

// Clear tasks from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    )

}
