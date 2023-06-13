# Task Management System
Task Management System app made for educational purpose, created with React as Front-End, Node.js as Back-End and MongoDB as database.

## General information
* The main purpose of the app is to view/add to dos'.
* Guests are only able to see Login/Register page.
* Logged in users have access to Add Task, Completed Tasks, Tasks, Download Tasks and they are able to perform CRUD operations on each task.
* State Management - Redux
## Technologies 
* Client
    * React: 18.2.0
    * Redux: 8.0.7
* Server
    * Node: 18.12.0
    * ExpressJS: 4.18.2
    * bcrypt: 5.1.0
    * cors: 2.8.5
    * dotenv: 16.1.4
    * jsonwebtoken: 9.0.0,
    * mongoose: 7.2.3,
    * nodemon: 2.0.22

## Setup
To run this project, in the project directory, you should run:

```
$ cd ./client
$ npm install
$ npm start
```
Which opens the app at http://localhost:3000 in your browser.
However it will not work until you don't start the RESTful API server.
To start the server you have to be in the project directory and do the following steps:

```
$ cd ./server
$ npm install
$ npm start
```

And the server will start listening on port 7070.

### Tests
* The application have unit tests for the following components: Login, Register
* To run the tests: 
```
$ cd ./client
$ npm run test
```