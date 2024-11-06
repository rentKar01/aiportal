// Initial sample tasks
const todayTasks = [
  { task: "Respond to client inquiries", status: "Pending", priority: "Medium" },
  { task: "Review and finalize financial reports", status: "Pending", priority: "High" },
  { task: "Prepare for team sync meeting", status: "Collaborator", priority: "Low" }
];

// Display today's tasks
function displayTodayTasks() {
  const taskList = document.getElementById("today-task-list");
  taskList.innerHTML = "";

  todayTasks.forEach((taskObj, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("flex", "items-center", "mb-3", "bg-gray-800", "rounded", "p-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-3", "bg-gray-800", "rounded");

    const taskLabel = document.createElement("span");
    taskLabel.textContent = `${taskObj.task} - Priority: ${taskObj.priority}`;
    taskLabel.classList.add("flex-1");

    const statusSpan = document.createElement("span");
    statusSpan.innerHTML = `<span class="status-dot ${getStatusColor(taskObj.status)}"></span> ${taskObj.status}`;
    statusSpan.classList.add("text-sm", "ml-3");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("text-red-500", "ml-3", "hover:underline");
    deleteButton.onclick = () => {
      todayTasks.splice(index, 1);
      displayTodayTasks();
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(statusSpan);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Helper to get the color for the status dot
function getStatusColor(status) {
  if (status === "Pending") return "green";
  if (status === "Collaborator") return "blue";
  return "red";
}

// Submit brainstorm idea and simulate AI response
function submitBrainstorm() {
  const idea = document.getElementById('brainstorm-input').value.trim();
  if (idea === '') {
    alert('Please enter an idea to brainstorm.');
    return;
  }

  document.getElementById('ai-response').classList.remove('hidden');
  document.getElementById('ai-answer').textContent = 'Searching for AI insights...';

  setTimeout(() => {
    document.getElementById('ai-answer').textContent = `AI suggests exploring this idea: "${idea}" with a targeted outreach campaign.`;
  }, 2000);
}

// Add brainstormed idea to the to-do list
function addBrainstormToTasks() {
  const aiAnswer = document.getElementById('ai-answer').textContent;
  if (aiAnswer && !todayTasks.some(taskObj => taskObj.task === aiAnswer)) {
    todayTasks.push({ task: aiAnswer, status: "Pending", priority: "Medium" });
    displayTodayTasks();
    alert('Brainstormed idea added to the To-Do List!');
  }
}

// Add a new task to today's list with an optional collaborator and priority
function addTodayTask() {
  const taskText = document.getElementById("new-today-task").value.trim();
  const collaboratorEmail = document.getElementById("collaborator-email").value.trim();
  const priority = document.getElementById("priority-select").value;
  if (taskText === '') return;

  const status = collaboratorEmail ? "Collaborator" : "Pending";
  todayTasks.push({ task: `${taskText}${collaboratorEmail ? ` (Collaborator: ${collaboratorEmail})` : ''}`, status, priority });
  
  displayTodayTasks();
  document.getElementById("new-today-task").value = '';
  document.getElementById("collaborator-email").value = '';
}

// Function to download tasks as Excel
function downloadTasksAsExcel() {
  let csvContent = "data:text/csv;charset=utf-8,Task,Status,Priority\n";
  todayTasks.forEach(taskObj => {
    csvContent += `${taskObj.task},${taskObj.status},${taskObj.priority}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Rentkar_Today_Tasks.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Mark video as complete (for upskill section)
function markComplete(barElement) {
  barElement.style.width = "100%";
  alert("Video marked as complete!");
}

// Initialize and display today's tasks
document.addEventListener("DOMContentLoaded", displayTodayTasks);
