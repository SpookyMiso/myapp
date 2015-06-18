var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

router.use(function (request, response, next) {
  console.log("Chatroom Router");
  next();
});

router.route('/:chatroom')
  .get(function (request, response){

  var chatroomName = request.params.chatroom;

  var messages = chatroom.readChatroom( chatroomName );
  response.json(messages);

})

  .post(function (request, response){

  var newMessage = {
    name: request.body.name,
    message: request.body.message
  };

  var chatroomName = request.params.chatroom;
  var messages = chatroom.postMessage(newMessage, chatroomName);

  response.json(messages);

});
