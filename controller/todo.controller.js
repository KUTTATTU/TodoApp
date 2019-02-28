const Todo = require('../model/todo.model');
var auth = require('basic-auth');
var authHelper = require('../helpers/auth');
const jwt = require('jsonwebtoken');

var seq;

/* GET /authorize. */
exports.authorize = async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
    // If code is present, use it
    if (code) {
        try {
            token= await authHelper.getTokenFromCode(code);
        } catch (error) {
            res.end('Error exchanging code for token');
        }
        if (token){
            const user = jwt.decode(token.token.id_token);
            req.session.useremail = user.preferred_username
            res.end('<h1>Name: </h1>' + user.name + '<h2>Mail: </h2>' + user.preferred_username + '<br><a type="button" href="/todos/logout">Logout</a>');
        }
        
    } else {
        // Otherwise complain
        res.end('Authorization error->Missing code parameter');
    }
}

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
    Todo.Todolist.find(function(err, todos) {
        if (err) {
            return next(err);
        }
        res.send(todos)
    })
}
exports.todo_create = function(req, res) {

    var todo;
    Todo.Counter.count(function(err, count) {
        if (!err && count === 0) {
            var myobj = new Todo.Counter({ Cid: "todo_id", sequence_value: 0 });
            console.log(myobj);
            myobj.save(function(err) {
                if (err) {
                    console.log(myobj);
                } else
                    getCounter();
            });

        } else
            getCounter();
    });

    function addtodo(val) {
        this.seq = val;

        todo = new Todo.Todolist();
        todo.taskId = this.seq;
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.targetTime = req.body.targetTime;
        todo.priority = req.body.priority;
        todo.status = req.body.status;


        todo.save(function(err) {

            if (err) {
                console.log(err);
            }
            res.send('Todo Created successfully  ' + todo.taskId)
        })

    }

    function getCounter() {

        Todo.Counter.findOneAndUpdate({ Cid: "todo_id" }, { $inc: { sequence_value: 1 } }, function(error, counter) {
            if (error)
                console.log("Can't find and update todo_id");
            else
                findtodoidandcreatetodo();
        });


        function findtodoidandcreatetodo() {
            Todo.Counter.findOne({ Cid: "todo_id" }, function(err, counter) {
                if (err)
                    console.log("Can't find 'todo_id' ");
                else
                    addtodo(counter.sequence_value);
            });
        }

    }

};

exports.todo_details = function(req, res) {

    Todo.Todolist.findOne({ taskId: req.params.id }, function(err, todo) {
        if (err) console.log(err);
        res.send(todo);
    });
};

exports.todo_update = function(req, res) {

    Todo.Todolist.findOneAndUpdate({ taskId: req.params.id }, { $set: req.body }, function(error, counter) {
        if (error)
            console.log("Can't find and update todo_id");
        res.send('todo udpated.');
    });
};

exports.todo_delete = function(req, res) {
    Todo.Todolist.findOneAndRemove({ taskId: req.params.id }, function(err) {
        if (err) {
            console.log(" Delete todo Failed");
        };
        res.send('Todo deleted successfully!');
    })
};

exports.todo_logout = function(req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            return next(err);
          } else {
            return res.redirect('/todos/OAuth');
          }
        });
      }
}