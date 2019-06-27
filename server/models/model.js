var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  task: String
});

module.exports = mongoose.model('todo', todoSchema);
// first param is the name of the model
// next param is the schema used
