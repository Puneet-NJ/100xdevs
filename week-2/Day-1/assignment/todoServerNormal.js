/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

//   THIS IS NORMAL VERSION I.E. WITHOUT USING ANY FILES

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const todos = [
	{
		title: "Complete Cohort's assignment",
		description: "Need to complete Node.js assignment from Harkirat's Cohort",
		completed: false,
		id: Math.floor(Math.random() * 10000),
	},
];

app.get("/todos", (req, res) => {
	res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
	const id = req.params.id;
	const todoToFind = todos.find((todo) => todo.id === Number(id));

	if (todoToFind) {
		res.status(200);
		res.json({ todoToFind });
	} else {
		res.status(404);
		res.send("No Todo by the id: " + id);
	}
});

app.post("/todos", (req, res) => {
	const todoToBeAdded = req.body;
	todoToBeAdded.id = Math.floor(Math.random() * 10000);
	todos.push(todoToBeAdded);
	res.status(201).json(todoToBeAdded.id);
});

app.put("/todos/:id", (req, res) => {
	const id = req.params.id;
	const todoRecived = req.body;

	todos.map((todo) => {
		if (Number(id) === todo.id) {
			todo.completed = todoRecived.completed;
			todo.title = todoRecived.title;
			res.status(200).json({ id });
		}
	});
	res.status(404).send("No todo element found by id: " + id);
});

app.delete("/todos/:id", (req, res) => {
	const id = req.params.id;
	console.log(req.params);
	todos.map((todo, index) => {
		if (todo.id === Number(id)) {
			todos.splice(index, 1);
			res.status(200).json(id);
		}
	});
	res.status(404).json("No todo with the specific id was found");
});

app.listen(3002);

// module.exports = app;
