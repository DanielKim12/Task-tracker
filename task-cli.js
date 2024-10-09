//  build a simple command line interface (CLI) to track what you need to do, 
// what you have done, and what you are currently working on.
const fs = require('fs'); // file system module
const path = require('path'); // path module

// path to tasks.json file, initalize the file
const tasksFilePath = path.join(__dirname, 'tasks.json'); 

// initialize task if it does not exist 
function initTaskFile() {
    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([]), 'utf-8');
    }
}

// Load tasks from the JSON file, used to read the file or CLI commands
function loadTasks() {
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
}

// Save tasks back to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// Get command line arguments
const args = process.argv.slice(2);

// Handle user's input
// uses switch statement to handle different commands
// CLI commands: add, update, delete, mark-in-progress, mark-done, list
function handleCommand() {
    const command = args[0];
    switch (command) {
        case 'add': 
            const taskDescription = args[1]; // task description
            addTask(taskDescription); // pass it to the function
            break;
        case 'update':
            const taskId = parseInt(args[1]); // convert string to integer
            const updatedDescription = args[2]; // new task description
            updateTask(taskId, updatedDescription);
            break;
        case 'delete':
            const deleteTaskId = parseInt(args[1]); // store the task id into deleteTaskId
            deleteTask(deleteTaskId);
            break;
        case 'mark-in-progress':
            const markInProgressTaskId = parseInt(args[1]);
            markTaskInProgress(markInProgressTaskId);
            break;
        case 'mark-done':
            const markDoneTaskId = parseInt(args[1]);
            markTaskDone(markDoneTaskId);
            break;
        case 'list':
            const status = args[1];
            listTasks(status);
            break;
        default:
            console.log('Unknown command. Use add, update, delete, mark-in-progress, mark-done, or list.');
    }
}

// Add a new task
function addTask(taskDescription) {
    const tasks = loadTasks(); // load tasks from the file
    // create a new task object, with id, description, status, createdAt,
    const newTask = {
        id: tasks.length + 1, // id is the length of the tasks array + 1
        description: taskDescription, // task description
        status: 'todo', // status is todo
        createdAt: new Date().toISOString(), // date created
        updatedAt: new Date().toISOString(), // date updated
    };
    tasks.push(newTask); // add the new task to the tasks array
    saveTasks(tasks); // save the tasks back to the file
    console.log('Task added successfully.'); // print success message
}

// Mark a task as in progress
function updateTask(taskId, updatedDescription) {
    const tasks = loadTasks(); // load tasks from the file
    //  === checks the type and the value of the variable
    const taskIndex = tasks.findIndex((task) => task.id === taskId); // find the task with the given id
    if (taskIndex !== -1) { //check if the task exists
        tasks[taskIndex].description = updatedDescription // mark the task as in progress
        tasks[taskIndex].updatedAt = new Date().toISOString(); // to get the current date
        saveTasks(tasks); // save the tasks back to the file
        console.log(`Task marked as done (ID: ${taskId})`);
    } else {
        console.log('Task not found');
    }
}

// Mark a task as in progress
function deleteTask(deleteTaskId) {
    const tasks = loadTasks(); // load tasks from the file
    const filteredTasks = tasks.filter(task => task.id !== deleteTaskId);
    saveTasks(filteredTasks); // save the tasks back to the file
    console.log(`Task deleted (ID: ${deleteTaskId})`);
}

// Mark a task as in progress
function markTaskInProgress(markInProgressTaskId) {
    const tasks = loadTasks(); // load tasks from the file
    const taskIndex = tasks.findIndex((task => task.id === markInProgressTaskId)); 
    if(taskIndex != -1) {
        tasks[taskIndex].status = 'in-progress'; // mark the task as in progress
        tasks[taskIndex].updatedAt = new Date().toISOString(); // to get the current date
        saveTasks(tasks); // save the tasks back to the file
        console.log(`Task marked as in progress (ID: ${markInProgressTaskId})`);
    } else {
        console.log('Task not found');
    }
}

// Mark a task as done
function markTaskDone(markDoneTaskId) {
    const tasks = loadTasks(); // load tasks from the file
    const taskIndex = tasks.findIndex((task => task.id === markDoneTaskId));
    if(taskIndex != -1) {
        tasks[taskIndex].status = 'done'; // mark the task as done
        tasks[taskIndex].updatedAt = new Date().toISOString(); // to get the current date
        saveTasks(tasks); // save the tasks back to the file
        console.log(`Task marked as done (ID: ${markDoneTaskId})`);
    } else {
        console.log('Task not found');
    }
}

// List tasks
function listTasks(status = null) {
    const tasks = loadTasks(); // load tasks from the file
    let filteredTasks = tasks;
    if (status) {
        filteredTasks = tasks.filter(task => task.status === status);
    }
    console.log('Tasks:', filteredTasks);
}

initTaskFile();
handleCommand();