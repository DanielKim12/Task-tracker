# Task Tracker CLI

A simple Command Line Interface (CLI) tool to manage and track tasks. This project allows you to add, update, delete tasks, and mark tasks as in-progress or done. Tasks are stored in a JSON file and can be listed based on their status.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as "in-progress" or "done"
- List tasks based on their status
- All tasks are stored in a `tasks.json` file

## Requirements

- Node.js installed on your machine

## Getting Started

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/task-tracker-cli.git
```

2. Navigate to the project directory:
```bash
   cd task-tracker-cli
```

3. Install dependencies (if any) — currently, there are no external dependencies, so this step is not necessary unless you add some in the future.

4. Run the CLI commands:
```bash
   node task-cli.js <command> <arguments>
```

## Commands 
### Add a Task
To add a new task, use the add command followed by the task description.
```bash
   node task-cli.js add "Buy groceries"
```
### Update a Task
To update a task description, use the update command followed by the task ID and the new description.
```bash
   node task-cli.js update 1 "Finish project and submit"
```
### Delete a Task
To delete a task, use the delete command followed by the task ID.
```bash
   node task-cli.js delete 1
```
### Mark a Task as In-Progress
To mark a task as in-progress, use the mark-in-progress command followed by the task ID.
```bash
   node task-cli.js mark-in-progress 1
```
### Mark a Task as Done
To mark a task as done, use the mark-done command followed by the task ID.
```bash
   node task-cli.js mark-done 1
```
### List Tasks
To list all tasks, use the list command.
```bash
   node task-cli.js list
```
To list tasks by their status (todo, in-progress, or done), pass the status as an argument.
```bash
   node task-cli.js list todo
```

## JSON File
All tasks are stored in a JSON file named tasks.json in the project directory. The file is automatically created if it doesn't exist.
Each task has the following properties:

- id: A unique identifier for the task
- description: The task description
- status: The current status of the task (todo, in-progress, or done)
- createdAt: The date and time when the task was created
- updatedAt: The date and time when the task was last updated

Project url: https://roadmap.sh/projects/task-tracker
