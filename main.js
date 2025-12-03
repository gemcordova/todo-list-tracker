document.addEventListener('DOMContentLoaded', () => {
	const STORAGE_KEY = 'tasks';
	const taskListCollection = [];

	const taskInput = document.getElementById('taskInput');
	const addTaskBtn = document.getElementById('addTaskBtn');
	const renderedList = document.getElementById('renderedList');
	const emptyImg = document.getElementById('emptyImg');

	function saveTasks() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(taskListCollection));
		} catch (err) {
			console.error('Failed to save to localStorage:', err);
		}
	}

	function loadTasks() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (!saved) return;
			const parsed = JSON.parse(saved);
			if (Array.isArray(parsed)) {
				taskListCollection.push(...parsed);
			} else {
				// If saved data is malformed, ignore it and clear it
				console.warn(
					'Saved tasks is not an array — clearing localStorage key.'
				);
				localStorage.removeItem(STORAGE_KEY);
			}
		} catch (err) {
			console.error('Failed to load tasks from localStorage:', err);
		}
	}

	function renderList() {
		renderedList.innerHTML = ''; // clear

		if (taskListCollection.length > 0) {
			emptyImg?.classList?.add('empty-img-active');
			// Build nodes rather than concatenating HTML (safer)
			taskListCollection.forEach((task, i) => {
				const li = document.createElement('li');
				li.textContent = task + ' ';

				const delBtn = document.createElement('button');
				delBtn.type = 'button';
				delBtn.className = 'delete-btn';
				delBtn.dataset.index = i;
				delBtn.textContent = 'Delete';

				li.appendChild(delBtn);
				renderedList.appendChild(li);
			});
		} else {
			emptyImg?.classList?.remove('empty-img-active');
		}
	}

	function removeTask(index) {
		if (index < 0 || index >= taskListCollection.length) return;
		taskListCollection.splice(index, 1);
		saveTasks();
		renderList();
	}

	function addTask() {
		const value = (taskInput.value || '').trim();
		if (!value) {
			alert('Please input a Task');
			return;
		}
		taskListCollection.push(value);
		taskInput.value = '';
		saveTasks();
		renderList();
		taskInput.focus();
	}

	// Event listeners
	addTaskBtn?.addEventListener('click', (e) => {
		e.preventDefault();
		addTask();
	});

	// Optional: allow Enter in input to add
	taskInput?.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addTask();
		}
	});

	// Event delegation for delete buttons
	renderedList?.addEventListener('click', (e) => {
		const btn = e.target;
		if (btn && btn.classList && btn.classList.contains('delete-btn')) {
			const idx = Number(btn.dataset.index);
			removeTask(idx);
		}
	});

	// Initialize
	loadTasks();
	renderList();
});
