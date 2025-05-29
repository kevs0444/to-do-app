const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();

  if (title === "") {
    alert("Please enter a task title.");
    return;
  }

  fetch("add_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
  })
  .then(response => response.text())
  .then(data => {
    console.log("Add Task Response:", data);
    taskForm.reset();  // clear inputs
    loadTasks();       // reload tasks
  })
  .catch(err => console.error("Error adding task:", err));
});

function loadTasks() {
  fetch("get_tasks.php")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(tasks => {
      taskList.innerHTML = ""; // clear old tasks

      if (tasks.length === 0) {
        taskList.innerHTML = "<li>No tasks found.</li>";
        return;
      }

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div>
            <strong class="${task.status == 1 ? 'done' : ''}">${task.title}</strong>
            <p>${task.description || ''}</p>
          </div>
          <div>
            <button onclick="markDone(${task.id})" ${task.status == 1 ? "disabled" : ""}>✓</button>
            <button onclick="deleteTask(${task.id})">✗</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading tasks:", err);
      taskList.innerHTML = "<li>Error loading tasks.</li>";
    });
}

function markDone(id) {
  fetch("update_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${id}`
  })
  .then(response => response.text())
  .then(data => {
    console.log("Mark Done Response:", data);
    loadTasks();
  })
  .catch(err => console.error("Error marking task done:", err));
}

function deleteTask(id) {
  fetch("delete_task.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${id}`
  })
  .then(response => response.text())
  .then(data => {
    console.log("Delete Task Response:", data);
    loadTasks();
  })
  .catch(err => console.error("Error deleting task:", err));
}

window.addEventListener("DOMContentLoaded", loadTasks);
