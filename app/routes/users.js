var express = require('express');
var router = express.Router();

var chatroom = require('../lib/chatroom.js');

module.exports = router;

router.get('/users/:username',function (request, response){

});

router.get('users/:username/:chatroom', function (request, response){

});
