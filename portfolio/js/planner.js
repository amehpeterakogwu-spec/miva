// ============================================================
// planner.js — Academic Planner: add / complete / delete tasks
// Demonstrates: arrays, functions, DOM manipulation, events,
// dynamic content updates, localStorage persistence.
// ============================================================

(function () {
  var STORAGE_KEY = 'apa_planner_tasks_v1';

  /** @type {Array<{id:string, title:string, due:string, priority:string, done:boolean}>} */
  var tasks = [];
  var currentFilter = 'all';

  var form = document.getElementById('task-form');
  var titleInput = document.getElementById('task-title');
  var dueInput = document.getElementById('task-due');
  var priorityInput = document.getElementById('task-priority');
  var listEl = document.getElementById('task-list');
  var emptyEl = document.getElementById('empty-state');
  var filterBtns = document.querySelectorAll('.chip-btn');
  var statTotal = document.getElementById('stat-total');
  var statDone = document.getElementById('stat-done');
  var statPending = document.getElementById('stat-pending');

  function loadTasks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : seedTasks();
    } catch (e) {
      tasks = seedTasks();
    }
  }

  function seedTasks() {
    return [
      { id: cryptoId(), title: 'Submit COS 106 term project', due: '2026-08-01', priority: 'high', done: false },
      { id: cryptoId(), title: 'Review network security lecture notes', due: '2026-07-29', priority: 'medium', done: false },
      { id: cryptoId(), title: 'Complete OverTheWire Bandit levels 6-10', due: '2026-07-30', priority: 'low', done: true }
    ];
  }

  function cryptoId() {
    return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'No due date';
    var d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function getFilteredTasks() {
    if (currentFilter === 'active') return tasks.filter(function (t) { return !t.done; });
    if (currentFilter === 'done') return tasks.filter(function (t) { return t.done; });
    return tasks;
  }

  function render() {
    var visible = getFilteredTasks();
    listEl.innerHTML = '';

    if (visible.length === 0) {
      emptyEl.style.display = 'block';
    } else {
      emptyEl.style.display = 'none';
      visible.forEach(function (task) {
        listEl.appendChild(buildTaskEl(task));
      });
    }

    statTotal.textContent = tasks.length;
    statDone.textContent = tasks.filter(function (t) { return t.done; }).length;
    statPending.textContent = tasks.filter(function (t) { return !t.done; }).length;
  }

  function buildTaskEl(task) {
    var li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    var check = document.createElement('button');
    check.className = 'task-check';
    check.setAttribute('aria-label', task.done ? 'Mark task as not done' : 'Mark task as done');
    check.textContent = task.done ? '\u2713' : '';
    check.addEventListener('click', function () { toggleDone(task.id); });

    var body = document.createElement('div');
    body.className = 'task-body';

    var title = document.createElement('div');
    title.className = 'task-title';
    title.textContent = task.title;

    var meta = document.createElement('div');
    meta.className = 'task-meta';

    var due = document.createElement('span');
    due.textContent = '\uD83D\uDCC5 ' + formatDate(task.due);

    var priority = document.createElement('span');
    priority.className = 'priority-' + task.priority;
    priority.textContent = '\u25CF ' + task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + ' priority';

    meta.appendChild(due);
    meta.appendChild(priority);
    body.appendChild(title);
    body.appendChild(meta);

    var del = document.createElement('button');
    del.className = 'task-delete';
    del.setAttribute('aria-label', 'Delete task');
    del.textContent = '\u2715';
    del.addEventListener('click', function () { deleteTask(task.id); });

    li.appendChild(check);
    li.appendChild(body);
    li.appendChild(del);
    return li;
  }

  function addTask(title, due, priority) {
    tasks.unshift({ id: cryptoId(), title: title, due: due, priority: priority, done: false });
    saveTasks();
    render();
  }

  function toggleDone(id) {
    tasks = tasks.map(function (t) {
      if (t.id === id) t.done = !t.done;
      return t;
    });
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    saveTasks();
    render();
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = titleInput.value.trim();
      if (!title) {
        titleInput.focus();
        return;
      }
      addTask(title, dueInput.value, priorityInput.value || 'medium');
      form.reset();
      titleInput.focus();
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  if (listEl) {
    loadTasks();
    render();
  }
})();
