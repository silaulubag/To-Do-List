let isLoggedIn = false;
let currentUser = null;

let users = JSON.parse(localStorage.getItem('users')) || [];

function showRegistration() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registrationContainer").style.display = "block";
}

function showLogin() {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("registrationContainer").style.display = "none";
}

function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (users.some(user => user.username === username)) {
        alert("Username is already taken. Please choose a different one.");
        return;
    }

    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful. Please login.");
    showLogin();
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        isLoggedIn = true;
        currentUser = user;
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("registrationContainer").style.display = "none";
        document.getElementById("todoContainer").style.display = "block";
        // İlerleme çubuğunu göster
        document.getElementById("progressBarContainer").style.display = "block";
    } else {
        alert("Invalid username or password");
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("registrationContainer").style.display = "none";
    document.getElementById("todoContainer").style.display = "none";
}

let totalTasks = 0;
let completedTasks = 0;

function addTask() {
    if (!isLoggedIn) {
        alert("Please login first.");
        return;
    }

    const taskInput = document.getElementById("taskInput").value;
    const taskList = document.getElementById("taskList");
    const taskDueDate = document.getElementById("taskDueDate").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (taskInput !== "") {
        var newTask = document.createElement("li");
        newTask.innerHTML =
            '<input type="checkbox" onchange="completeTask()">' +
            '<span>' + taskInput + '</span>' +
            '<p>Due date: ' + taskDueDate + '</p>' +
            '<p>Description: ' + taskDescription + '</p>' +
            '<button onclick="removeTask(this.parentNode)">Remove</button>';
        taskList.appendChild(newTask);
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDueDate").value = "";
        document.getElementById("taskDescription").value = "";

    
        totalTasks++;
        updateProgressBar();
       
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const progress = (completedTasks / totalTasks) * 100;
    progressBar.style.backgroundColor = getColorForProgress(progress);
    progressBar.style.width = progress + "%";
    const percentageLabel = document.getElementById("percentageLabel");
    percentageLabel.textContent = `Completed: ${Math.round(progress)}%`;
}
function getColorForProgress(progress) {
   
    const red = Math.round(255 - (progress * 2.55));
    const green = Math.round(progress * 2.55);
    return `rgb(${red}, ${green}, 0)`;
}
function completeTask() {
    const checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
    completedTasks = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    updateProgressBar();
}

function removeTask(element) {
    var taskList = document.getElementById("taskList");
    taskList.removeChild(element);
   
    totalTasks--;
    updateProgressBar();
}

document.getElementById('themeSelector').addEventListener('change', function (event) {
    const selectedTheme = event.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
});

function applyTheme(theme) {
    document.body.className = theme;
}


flatpickr(".flatpickr-input", {
    dateFormat: "Y-m-d",
    minDate: "today",
    wrap: true
});
