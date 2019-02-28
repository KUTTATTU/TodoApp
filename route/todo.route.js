const express = require('express');
const router = express.Router();

const todo_controller = require('../controller/todo.controller');
var authHelper = require('../helpers/auth');

//Basic Authentication
router.get('/basicAuth', todo_controller.todoAuth);

//Microsoft Authentication
router.get('/OAuth', function(req, res, next) {
    signInUrl = authHelper.getAuthUrl();
    res.writeHead(301, { Location: signInUrl });
    res.end();

    //res.end(signInUrl);
});

router.get('/authorize', todo_controller.authorize);


//Get all todos
router.get('/all', todo_controller.todo_all);

//create a todo
router.post('/create', todo_controller.todo_create);

//get todo by id
router.get('/:id', todo_controller.todo_details);

//update todo by id
router.put('/:id/update', todo_controller.todo_update);

//delete todo by id
router.delete('/:id/delete', todo_controller.todo_delete);

module.exports = router;