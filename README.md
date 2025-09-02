# Full-Stack To-Do List Application
This project is a full-stack web application that demonstrates the fundamental CRUD (Create, Read, Update, Delete) operations. It allows a user to manage a personal list of tasks.

### 🚀 Technology Stack
Frontend
HTML5: For the application's structure.

CSS3: For styling and layout.

JavaScript (Vanilla JS): For all interactive functionality and API calls to the backend.

Backend
Node.js: The JavaScript runtime environment.

Express.js: A web framework for Node.js used to build the REST API.

MongoDB: A NoSQL database used to store the to-do list data.

### ⚠️ Important Note on Viewing This Project
This project consists of two main parts:

A frontend (the user interface you see in the browser).

A backend (the server and database that manage the data).

👉 Simply opening the index.html file in a browser will NOT work correctly. The frontend needs to communicate with the backend server to save, retrieve, update, and delete tasks. Therefore, the backend server must be running on the local machine for the application to be fully functional.

### 📦 Prerequisites
Before you begin, ensure you have the following software installed on your computer:

Node.js and npm (npm is included with Node.js).

MongoDB Community Server. Ensure MongoDB is running in the background.

### 🛠️ How to Run the Application (Step-by-Step)
Download and Unzip the Project
Download the project folder and unzip it to your desired location.

Install Backend Dependencies
Open your terminal or command prompt. Navigate into the project folder where server.js and package.json are located:

cd path/to/your-project-folder

Run the following command to install the required backend packages (Express, etc.):

npm install

Start the Backend Server
This is a critical step. Make sure your local MongoDB server is running. In the same terminal, run:

node server.js

You should see a confirmation message in the terminal, such as:

Server is running on http://localhost:3000
MongoDB connected successfully!

👉 Keep this terminal window open. The server needs to stay running.

 View the Frontend Application
Now, open the public/index.html file in your web browser. The application will load and be able to communicate with your local server.
You can now add, edit, and delete tasks. All the data you create will be stored in your local MongoDB database in a collection named todos.

### ✨ Application Features
Create: Add new tasks via the input field.

Read: View a list of all saved tasks.

Update:

Mark a task as complete.

Edit the text of an existing task.

Delete: Remove a task from the list.# minor_project
