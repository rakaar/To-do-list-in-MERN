var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();

// just like a mini app, at scale this will form better code structure as things can be kept in seperate file and imported
var todorouter = express.Router();

// some essential middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb, localhost:port/dbName
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
//just a confirmation that u are connected, not a necessary thing
const connection = mongoose.connection;
connection.on('open', () => console.log('mongo connected'));

// import the model created in model.js
var Todo = require('./models/model.js');

// using the router
app.use('/todo', todorouter);

//define the routes, this will generally BE IN A SEPERATE FILE, AND AT 'SCALE' U WILL FIND SEVERAL SUCH FILES
todorouter.get('/', (req, res) => {
  try {
    Todo.find((err, data) => {
      if (err) console.log(err);
      res.json(data);
    });
  } catch (err) {
    console.log('error is in get method', err);
  }
});

todorouter.get('/:id', (req, res) => {
  try {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(todo);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

todorouter.post('/add', (req, res) => {
  try {
    let todo = new Todo(req.body); // creating the thing to be saved
    todo
      .save() // the save function saves to the database and returns a promise
      .then(todo => res.status(200).send('posted', todo))
      .catch(err => res.status(400).send('err from post add side', err));
  } catch (err) {
    console.log('ERROR IS IN ADD METHOD', err);
  }
});

todorouter.put('/update/:id', (req, res) => {
  try {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) console.log(err);
      else todo.task = req.body.task;
      todo
        .save()
        .then(todo => res.send('updated thing is', todo))
        .catch(err => res.send(err));
    });
  } catch (err) {
    console.log('err IN PUTMETHOD', err);
  }
});

todorouter.delete('/delete/:id', (req, res) => {
  try {
    Todo.deleteOne({ _id: req.params.id }, (err, todo) => {
      if (err) {
        console.log('error while deleting', err);
      }
    });
  } catch (err) {
    console.log('err in catch', err);
  }
});

//listen to the port, the final step
app.listen(4000, () => console.log('server running !'));
