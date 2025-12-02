const taskListCollection = [];

// Document Objects
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
let renderedList = document.getElementById('renderedList');

// Remove task from Array
function removeTask(i) {
	taskListCollection.splice(i, 1);
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
		taskListCollection.unshift(taskInput.value.trim());
		taskInput.value = '';
		renderList();
	} else {
		alert('Please input a Task');
	}
}

// Event Listeners
addTaskBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addTask();
});
