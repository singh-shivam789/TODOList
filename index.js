const express = require('express');
const bodyParser = require("body-parser");

const db = require('./config/mongoose');
const Tasks = require('./models/task');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('Assets'));
app.listen(port, function(err) {
    if (err) {
        console.log(err, "Error in listening to requests");
    }

    console.log("Connected to server at port", port);
});

app.get('/', function(req, res) {
    Tasks.find({}, function(err, tasks) {
        if (err) {
            console.log("Error in fetching Tasks");
        }
        // console.log(tasks);
        res.render('index', {
            title: 'TODOList',
            tasks: tasks
        });
    });

});

app.post('/add-task', function(req, res) {
    Tasks.create({
        task: req.body.task,
        date: req.body.date,
        category: req.body.category
    }, function(err, newTask) {
        if (err) {
            console.log('Error in creating a task');
            return;
        }
        return res.redirect('back');
    });
});

app.get('/delete-task', function(req, res) {
    console.log(req.query);
    var id = req.query;

    // to check the number of tasks to be deleted
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        //Deleting the task from the database by using their individual ids
        Tasks.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log("Error in deleting the task from DB");
            }
        });
        console.log("Task-Deleted");
    }
    return res.redirect('back');
});