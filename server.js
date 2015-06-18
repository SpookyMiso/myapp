counter = 1;

var config = require ('./config.json');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var chatroom = require('./app/lib/chatroom.js');
chatroom.setDirectory('./app/data');


app.use(express.static(__dirname + '/public'));

app.set('views','./views');
app.set('view engine', "ejs");

app.use (bodyParser.json());

var server = app.listen(config.port);

app.get('/', function (request, response) {
  response.render('index');
});

app.use('/chatrooms', require('./app/routes/chatrooms.js'));
app.use('/users', require('./app/routes/users.js'));

app.get('/greet/:name', function (request, response) {
  var name = request.params.name.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1);
  response.render('index', {name: name});
});

app.get('/chatrooms/:chatroom', function (request, response){

  var chatroomName = request.params.chatroom;

  var messages = chatroom.readChatroom( chatroomName );
  response.json(messages);

});


app.get('/users/:username', function (request, response) {
  var user = request.params.user.toLowerCase();
  user = user[0].toUpperCase() + user.slice(1);
  response.render('index', {user: user});

});





app.post('/chatrooms/:chatroom', function (request, response){

  var newMessage = {
    name: request.body.name,
    message: request.body.message
  };

  var chatroomName = request.params.chatroom;
  var messages = chatroom.postMessage(newMessage, chatroomName);

  response.json(messages);

});



// app.get('/add/:x/:y', function (request, response) {
//   var x = request.params.x;
//   var y = request.params.y;
//   response.jason ({ answer: x + y});
// });

// function displayServerInfo () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('listening at http://%s:%s', host, port);

// }