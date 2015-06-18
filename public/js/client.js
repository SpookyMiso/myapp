var form = document.createElement('form');
form.method = "GET";
form.action = "http://localhost:8080/chatrooms/jenn";

var div =
    document.createElement('div');
    form.appendChild(div);

var roomName =
    document.createElement('input');
    form.appendChild(roomName);
    roomName.placeholder = "Room please!";
    roomName.className = "roomName";

var username =
    document.createElement('input');
    form.appendChild(username);
    username.placeholder = "Tell me your name";
    username.className = "username";

var message =
    document.createElement('input');
    form.appendChild(message);
    message.placeholder = "talk to me!";
    message.className = "message";



var button = document.createElement('button');

button.innerHTML = "Go";
button.type = "submit";
document.body.appendChild(form);
form.appendChild(button);

window.onload = function() {
  var request = new XMLHttpRequest();
  request.onload = function() {
  };
  request.responseType = 'json';
  request.open('GET', 'http://localhost:8080/chatrooms/jenn', true);
  request.send();
};

function appendItemList(things) {
  if (!(things instanceof Array)) {
    things = [things];
  }
  things.forEach(function (item) {
    if (item.hasOwnProperty('message')){
      var paragraph = document.createElement('p');
      paragraph.innerHTML = item.name + ": ";
      paragraph.innerHTML += item.message;
      div.appendChild(paragraph);
    }
  });
}


form.onsubmit = function (event) {
  event.preventDefault(); // Stop what you're doing
  var newMessage = {
      name: username.value,
      message: message.value
  };
  submitItem(newMessage);
};

function submitItem (item) {
  var request = new XMLHttpRequest();
  request.onload = function() {
    things = this.response;
    var messages = things;
    var filteredMessages = messages.filter(function(message){
      return true;
    });

    // filter out old messages, create new var new messages, instead of appending all the messages, just the new ones
    appendItemList(things); //change after
  };

  request.responseType = 'json';
  request.open('POST', 'http://localhost:8080/chatrooms/jenn', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(item));
}
