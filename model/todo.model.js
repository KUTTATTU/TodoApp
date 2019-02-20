//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
//schema maps database into JavaScript objects
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    targetTime: { type: Date, required: true },
    priority: { type: String, required: true },
    status: { type: Boolean, required: true }
});


// Export the model
module.exports = mongoose.model('Todo', TodoSchema);