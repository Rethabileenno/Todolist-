document.getElementById('sortTasks').addEventListener('click', function() {
    var list = document.getElementById('taskList');
    Array.from(list.getElementsByTagName("LI"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => list.appendChild(li));
});



document.getElementById('addTask').addEventListener('click', function() {
    var value = document.getElementById('newTask').value;
    if (value) {
        addTask(value);
        document.getElementById('newTask').value = '';
        saveTasks();
    }
});

document.getElementById('clearAll').addEventListener('click', function() {
    var list = document.getElementById('taskList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    localStorage.removeItem('tasks');
});

document.getElementById('showCompleted').addEventListener('click', function() {
    var list = document.getElementById('taskList');
    for (var i = 0; i < list.children.length; i++) {
        var task = list.children[i];
        if (!task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = '';
        }
    }
});

document.getElementById('showUncompleted').addEventListener('click', function() {
    var list = document.getElementById('taskList');
    for (var i = 0; i < list.children.length; i++) {
        var task = list.children[i];
        if (task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = '';
        }
    }
});

// ... rest of the JavaScript code ...
function addTask(text) {
    var list = document.getElementById('taskList');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');

    var remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', function(e) {
        removeTask(e);
        saveTasks();
    });
    buttons.appendChild(remove);

    var complete = document.createElement('button');
    complete.innerText = 'Complete';
    complete.addEventListener('click', function(e) {
        completeTask(e);
        saveTasks();
    });
    buttons.appendChild(complete);

    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

function removeTask(e) {
    var item = e.target.parentNode.parentNode;
    var parent = item.parentNode;
    parent.removeChild(item);
}

function completeTask(e) {
    var item = e.target.parentNode.parentNode;
    item.classList.toggle('completed');
}

function saveTasks() {
    var tasks = [];
    for (var i = 0; i < taskList.children.length; i++) {
        var task = taskList.children[i];
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    if (localStorage.getItem('tasks')) {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        for (var i = 0; i < tasks.length; i++) {
            addTask(tasks[i].text);
            if (tasks[i].completed) {
                taskList.children[i].classList.add('completed');
            }
        }
    }
}

loadTasks();