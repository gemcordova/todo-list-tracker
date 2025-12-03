const taskListCollection = [];

// Document Objects
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
let renderedList = document.getElementById('renderedList');

// Save tasks to localStorage
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(taskListCollection));
}

// Load tasks from localStorage
function loadTasks() {
	const saved = localStorage.getItem('tasks');
	if (saved) {
		const parsed = JSON.parse(saved);
		taskListCollection.push(...parsed); // keep same array reference
		renderList();
	}
}

// Remove task from Array
function removeTask(i) {
	taskListCollection.splice(i, 1);
	saveTasks();
	renderList();
}

// Render the List
function renderList() {
	renderedList.innerHTML = '';

	if (taskListCollection.length > 0) {
		document.getElementById('emptyImg').classList.add('empty-img-active');

		for (let i = 0; i < taskListCollection.length; i++) {
			const task = taskListCollection[i];
			renderedList.innerHTML += `<li>${task} <button onclick='removeTask(${i})'>Delete</button></li>`;
		}
	} else {
		document.getElementById('emptyImg').classList.remove('empty-img-active');
	}
}

// Add task to Array
function addTask() {
	if (taskInput.value.trim() !== '') {
		taskListCollection.push(taskInput.value.trim());
		taskInput.value = '';
		saveTasks(); // save after adding
		renderList();
	} else {
		alert('Please input a Task');
	}
}

// Event Listener
addTaskBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addTask();
});

// Load tasks on page load
loadTasks();
