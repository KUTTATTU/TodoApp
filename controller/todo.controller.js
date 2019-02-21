const Todo = require('../model/todo.model');
var auth = require('basic-auth')

exports.todoAuth = function(req, res) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== 'root' || credentials.pass !== 'root') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"')
        res.end('Access denied')
    } else {
        res.writeHead(301, { Location: 'http://localhost:8090/todos/all' });
        res.end();
    }

}
exports.todo_all = function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            return next(err);
        }
        res.send(todos)
    })
}
exports.todo_create = function(req, res) {
    var todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        targetTime: req.body.targetTime,
        priority: req.body.priority,
        status: req.body.status

    });
    todo.save(function(err) {
        if (err) {
            return next(err);
        }
        res.send('Todo Created successfully  ' + todo.title)
    })
};

exports.todo_details = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (err) return next(err);
        res.send(todo);
    })
};

exports.todo_update = function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, todo) {
        if (err) return next(err);
        res.send('todo udpated.');
    });
};

exports.todo_delete = function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Todo deleted successfully!');
    })
};