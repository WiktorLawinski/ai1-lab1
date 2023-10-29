const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTask = document.getElementById('addTask');
const search = document.getElementById('search');

document.getElementById("taskDate").min = new Date().toISOString().split("T")[0];
// Funkcja do dodawania zadania
function addTaskToList() {
    const taskText = taskInput.value.trim();
    const taskDueDate = taskDate.value;

    if (taskText.length >= 3 && taskText.length <= 255 && (!taskDueDate || new Date(taskDueDate) > new Date())) {
        const li = document.createElement('li');
        li.innerHTML = `<span id="textli">${taskText}</span> <span id="dateli">${taskDueDate}</span><button class="deleteTask">Usuń</button>`;

        taskList.appendChild(li);

        const deleteButton = li.querySelector('.deleteTask');
        if (deleteButton) {
            deleteButton.addEventListener('click', function () {
                li.remove();
                updateLocalStorage();
            });
        }

        updateLocalStorage();

        taskInput.value = '';
        taskDate.value = '';
    } else {
        alert('Niepoprawne zadanie lub data.');
    }
}

// Funkcja do usuwania zadania
function deleteTaskFromList(event) {
    if (event.target.classList.contains('deleteTask')) {
        event.target.parentElement.remove();
        updateLocalStorage();
    }
}

// Funkcja do zaktualizowania Local Storage
function updateLocalStorage() {
    const tasks = [];
    for (const task of taskList.getElementsByTagName('li')) {
        tasks.push(task.innerText.slice(0, task.innerText.length-4));
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcja do wczytania zadań z Local Storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of tasks) {
        const li = document.createElement('li');
        li.innerHTML = task;

        // Znajdź przycisk "Usuń"
        const deleteButton = li.querySelector('.deleteTask');

        if (deleteButton) {
            taskList.appendChild(li);
        } else {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'deleteTask';
            deleteButton.textContent = 'Usuń';
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
    }
}

// Funkcja do filtrowania zadań
function filterTasks() {
        const searchPhrase = search.value.toLowerCase();
        for (const task of taskList.getElementsByTagName('li')) {
            const taskText = task.textContent.toLowerCase();

            if (taskText.includes(searchPhrase)) {
                // Wyłącz wyświetlanie listy, aby uwzględnić tylko pasujące wyniki
                task.style.display = 'block';

                // Wyróżnij wyszukiwaną frazę w każdym wyniku wyszukiwania
                task.innerHTML = taskText.replace(new RegExp(searchPhrase, 'gi'), match => `<mark>${match}</mark>`);

            } else {
                task.style.display = 'none';
            }
        }
}
// Funkcja do kliknięcia na zadanie i zmiany w pole edycji
function editTask(event) {
    const taskItem = event.target.closest('li');

    if (!taskItem) return;

    const isEditing = taskItem.classList.contains('editing');

    if (!isEditing) {
        const taskText = taskItem.textContent;
        taskItem.innerHTML = `<input type="text" value="${taskText}">`;
        taskItem.classList.add('editing');

        const editInput = taskItem.querySelector('input');
        editInput.addEventListener('blur', saveTaskChanges);
        editInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                saveTaskChanges(event);
            }
        });
    }
}
// Funkcja do zapisywania zmian w zadaniu
function saveTaskChanges(event) {
    const taskItem = event.target.closest('li');

    if (!taskItem) return;

    const editInput = taskItem.querySelector('input');
    const editedText = editInput.value;
    taskItem.textContent = editedText;
    taskItem.classList.remove('editing');

    updateLocalStorage();
}

addTask.addEventListener('click', addTaskToList);
taskList.addEventListener('click', deleteTaskFromList);
search.addEventListener('input', filterTasks);
taskList.addEventListener('click', editTask);

// Wczytaj zadania z Local Storage po załadowaniu strony
loadTasksFromLocalStorage();