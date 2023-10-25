# Task App Backend

## Description

An express js backend api for a technical assessment. The project has jwt tokens and authenticated routes for security. It is used in a reactjs front end for a task management app.

## Table of Contents

- [Tasks App Backend](#project-title)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [API Endpoints](#api-endpoints)
  - [Technologies Used](#technologies-used)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

 - Git clone or download the zip file from the github link of the project. 
 - Ensure you have nodejs installed and some text editor of your choice if you will to add, fork or for personal use. 
 - Then run npm init to install packages.
 - Make sure you have updated your .env variables from the .env.example file i have in the project.
 - Finally run npm run dev to run the node server in the project

## Usage

Use the project as a playground for your api tests or as code snippets for your own project.

## Features

  

## API Endpoints

If your project includes an API, list and describe the available endpoints, request methods, and expected responses. You can format this section like a table or use bullet points.

Example:

- `GET /api/tasks`: Retrieve a list of tasks.
  - Request: None
  - Response: JSON array of tasks
- `GET /api/tasks/:id`: Retrieve a task.
  - Request: None
  - Response: JSON response of task body  

- `POST /api/tasks`: Create a new task.
  - Request: JSON object with task details
  - Response: JSON object with the created task

## Technologies Used

    1. JWT
    2. MONGODB
    3. EXPRESSJS
    4. SUPERTEST and JEST
    5. NODEJS
    6. Nodemon
    7. Bcrypt,
    8. Mongoose
    9. XSS-CLEAN

## Testing

To run tests, git branch to `prod` open terminal in the path of the project and run `npx jest` or `npx jest --detectOpenHandles`

## Contributing

Git clone, edit project and contact me or create a pull request. If successful i will get back to you and review and add merge your changes
## License

It is licenced by MIT Licence @2023

