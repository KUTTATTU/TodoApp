//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
//schema maps database into JavaScript objects
const Schema = mongoose.Schema;

let CounterSchema = new Schema({
    Cid: { type: String, required: true, max: 100, default: 0 },
    sequence_value: { type: Number, required: true },
});

let TodoSchema = new Schema({
    taskId: { type: Number, required: true },
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    targetTime: { type: Date, required: true },
    priority: { type: String, required: true },
    status: { type: Boolean, required: true }
});


// Export the model
var Todolist = mongoose.model('Todo', TodoSchema);
var Counter = mongoose.model('Counter', CounterSchema);

module.exports = {
    Todolist: Todolist,
    Counter: Counter
};