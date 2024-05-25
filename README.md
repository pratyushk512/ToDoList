# TodoList MERN Stack Application

A simple TodoList application built using MERN stack, including a frontend developed with [React](https://reactjs.org/) and a backend powered by [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). The application allows users to create, read, update, and delete tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

1. Clone the repository:
https://github.com/pratyushk512/ToDoList

2. Navigate to the project directory:

    cd todolist-app


3. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd todoList
npm install

# Install backend dependencies
cd server
npm install

4.Start the server

# Start frontend server
cd todoList
npm run dev

# Start backend server
cd server
nodemon index.js
```
## **Usage**

* Open your web browser and navigate to http://localhost:3000 to access the TodoList application.
* Use the interface to add, view, edit, and delete tasks.
* Tasks are persisted to the mongodb database, allowing users to access them even after refreshing the page.

## **Features**

* Create new tasks with titles and descriptions.
* Mark tasks as completed.
* Edit existing tasks.
* Delete tasks.
* Filter tasks by status (completed, active).

