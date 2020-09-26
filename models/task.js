const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String

    }
});

const Tasks = mongoose.model('Tasks', task_schema);
module.exports = Tasks;