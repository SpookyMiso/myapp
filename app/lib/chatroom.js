
console.log('LOADING BEEMO...');

module.exports = {
 setDirectory: _setDirectory,
 getDirectory: _getDirectory,
 createRoom: _createRoom,
 readChatroom: _readChatroom,
 postMessage: _postMessage,
 getUserMessages: _getUserMessages
};

var fs = require('fs');
var path = require('path');

var _chatDirectory = null;



function _setDirectory (directoryPath) {
  var directory = null;
  var dirPath = path.resolve(directoryPath);

  try {
    directory = fs.statSync(dirPath);
  } catch(err) {

    fs.mkdirSync(dirPath, 0777);
    directory = fs.statSync(dirPath);
  }

  var isDirectory = directory.isDirectory();

  if (isDirectory) {
    _chatDirectory = directoryPath;
  }
  return isDirectory;
}

function _getDirectory () {
  return _chatDirectory;
}

function _createRoom (roomName) {
  var messages = [];
  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  fs.writeFileSync( filepath, JSON.stringify( messages ) );
  mode: 0777;

  return messages;

}

function _readChatroom ( roomName, username ) {
  var filepath = path.resolve(_chatDirectory, roomName + '.json');

  var fileString = null;

  try {
    fileString = fs.readFileSync( filepath ).toString();
  } catch (err) {
    return _createRoom(roomName);
  }

  if(username !== undefined) {
    var messages = JSON.parse( fileString );
    var filteredMessages = messages.filter(function(message){
      return message.name === username;
    });
    return filteredMessages;
  } else {
    return JSON.parse( fileString );
  }

}

function _postMessage ( message, roomName ) {
  var messages = _readChatroom( roomName );

  var newMessage = {
    name: message.name,
    message: message.message,
    id: messages.length + 1,
    timestamp: new Date().toString()
  };

  messages.push( newMessage );

  var filepath = path.resolve(_chatDirectory, roomName + '.json');
  fs.writeFileSync( filepath, JSON.stringify( messages ) );

  return messages;
}

function _getUserMessages ( username ) {
  var filepath = fs.readdirSync(_chatDirectory);

  var userMessages = [];
  filepath.forEach(function(fileName){
    var chatroom = fileName.slice(0, -5);
    var userRoomMessages = _readChatroom(chatroom, username);
    userMessages = userMessages.concat(userRoomMessages);
  });
  return userMessages;
}