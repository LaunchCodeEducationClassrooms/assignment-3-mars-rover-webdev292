//const Command = require('./command.js');
const Command = require('./command.js');

class Message {
   // Write code here!
constructor(name, commands) {
  this.name = name;
  //this.commands = commands;
  if(!name){
    throw Error("Message name required.");
  }
  this.commands = commands;
}
}

module.exports = Message;