<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rentkar AI Daily Assistant</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .bg-dark-gray { background-color: #1E1E2C; }
    .text-muted { color: #A3A3A3; }
    .highlight-blue { color: #00ADB5; }
    .highlight-teal { color: #00FFC6; }
    .status-dot {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .status-dot.green { background-color: #00FFC6; }
    .status-dot.blue { background-color: #00ADB5; }
    .status-dot.red { background-color: #FF4C4C; }
    .hidden { display: none; }
  </style>
</head>
<body class="bg-black text-white min-h-screen flex flex-col items-center justify-center">

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto w-full">

    <!-- Morning Focus and Employee Info -->
    <div class="bg-dark-gray p-6 rounded-lg shadow-lg col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col lg:flex-row justify-between items-center">
      <div class="w-full lg:w-2/3">
        <h2 class="text-2xl font-semibold text-highlight-blue mb-4">Morning Focus 🌅</h2>
        <p class="text-muted text-sm mb-2">"What is one step you’re taking to move Rentkar forward today?"</p>
        <input type="text" placeholder="Describe your focus..." class="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-highlight-blue">
      </div>
      <div class="w-full lg:w-1/3 mt-4 lg:mt-0 bg-gray-800 p-4 rounded-lg">
        <div class="flex items-center">
          <img src="https://via.placeholder.com/50" alt="Employee Avatar" class="rounded-full mr-4">
          <div>
            <h3 class="text-lg font-semibold">John Doe</h3>
            <p class="text-sm text-muted">Skill Points: <span id="skill-points" class="highlight-blue">150</span></p>
            <p class="text-sm text-muted">Salary Increase: <span class="highlight-teal">₹10,000</span></p>
            <p class="text-sm text-muted">Job: Product Manager</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggleable Brainstorm Session -->
    <div class="bg-dark-gray p-6 rounded-lg shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
      <button onclick="toggleSection('brainstorm-section')" class="bg-highlight-blue text-white py-2 px-4 rounded mb-4 w-full text-left">Brainstorm Session 💡</button>
      <div id="brainstorm-section" class="hidden">
        <p class="text-muted mb-4">"Use this section to brainstorm new ideas for Rentkar and get AI-powered suggestions to enhance productivity."</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-900 rounded">
            <label class="block mb-2 text-sm font-semibold text-white">New Idea:</label>
            <input id="brainstorm-input" type="text" placeholder="Your idea..." class="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-highlight-teal mb-2">
            <button onclick="submitBrainstorm()" class="bg-highlight-blue hover:bg-highlight-teal text-white py-2 px-4 rounded transition-colors duration-200">Submit</button>
          </div>
          <div id="ai-response" class="p-4 bg-gray-900 rounded hidden">
            <h3 class="text-lg font-semibold mb-2 text-highlight-blue">AI Response:</h3>
            <p id="ai-answer" class="text-gray-300 mb-4"></p>
            <button onclick="addBrainstormToTasks()" class="bg-highlight-teal hover:bg-highlight-blue text-white py-2 px-4 rounded transition-colors duration-200">Add to To-Do List</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggleable Upskill Section -->
    <div class="bg-dark-gray p-6 rounded-lg shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
      <button onclick="toggleSection('upskill-section')" class="bg-highlight-teal text-white py-2 px-4 rounded mb-4 w-full text-left">Upskill 📈</button>
      <div id="upskill-section" class="hidden">
        <p class="text-muted mb-4">"Continue your growth with these curated learning videos. Click to track your progress and earn points."</p>
        <div class="flex overflow-x-auto space-x-4">
          <div class="p-4 bg-gray-800 rounded w-72 min-w-max">
            <img src="https://img.youtube.com/vi/ckNEdxQ0Tc0/0.jpg" alt="Video Thumbnail" class="mb-2 rounded">
            <h3 class="text-lg font-semibold mb-2 text-white">Video 1: Learning Performance Marketing</h3>
            <a href="https://www.youtube.com/watch?v=ckNEdxQ0Tc0" target="_blank" class="text-highlight-blue underline">Watch Video</a>
            <div class="completion-bar mt-2 bg-gray-600 h-1">
              <div class="bg-highlight-teal h-1" style="width: 0;" onclick="markComplete(this)"></div>
            </div>
          </div>
          <div class="p-4 bg-gray-800 rounded w-72 min-w-max">
            <img src="https://img.youtube.com/vi/ckNEdxQ0Tc0/0.jpg" alt="Video Thumbnail" class="mb-2 rounded">
            <h3 class="text-lg font-semibold mb-2 text-white">Video 2: Exploring Design Patterns</h3>
            <a href="https://www.youtube.com/watch?v=ckNEdxQ0Tc0" target="_blank" class="text-highlight-blue underline">Watch Video</a>
            <div class="completion-bar mt-2 bg-gray-600 h-1">
              <div class="bg-highlight-teal h-1" style="width: 0;" onclick="markComplete(this)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-Width To-Do List with Collaborator Email, Priority, and Status -->
    <div class="bg-dark-gray p-6 rounded-lg shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
      <h2 class="text-2xl font-semibold text-highlight-blue mb-4">Today's To-Do List 📋</h2>
      <ul id="today-task-list" class="space-y-3 mb-4">
        <!-- Initial sample tasks will be added here -->
      </ul>
      <div class="flex items-center mb-4">
        <input type="text" id="new-today-task" placeholder="Add a new task..." class="flex-1 p-3 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-highlight-blue">
        <input type="email" id="collaborator-email" placeholder="Invite collaborator (optional)" class="flex-1 p-3 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-highlight-teal ml-2">
        <select id="priority-select" class="p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-highlight-teal ml-2">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onclick="addTodayTask()" class="bg-highlight-teal hover:bg-highlight-blue text-white py-2 px-4 rounded-r transition-colors duration-200">Add Task</button>
      </div>
      <button onclick="downloadTasksAsExcel()" class="bg-highlight-blue hover:bg-highlight-teal text-white py-2 px-4 rounded w-full transition-colors duration-200">Download To-Do List as Excel</button>
    </div>

  </div>

  <div id="notification" class="fixed bottom-4 right-4 bg-highlight-blue text-white p-4 rounded shadow-lg hidden">You earned 100 points!</div>

  <script src="script.js"></script>
</body>
</html>
