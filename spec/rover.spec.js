const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts.", function() {
    let strRover = new Rover(666)
    expect(strRover.position).toEqual(666)
    expect(strRover.generatorWatts).toEqual(110)
  });

  it("response returned by receiveMessage contains name of message", function() {
    let newMsg = new Message("Test Message", [])
    let strRover = new Rover(666)
    expect(strRover.receiveMessage(newMsg).message).toEqual(newMsg.name)
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let newMsg = new Message("Test Message", [new Command('STATUS_CHECK', ''), new Command('STATUS_CHECK', '')])
    let strRover = new Rover(666)
    expect(newMsg.commands.length).toEqual(strRover.receiveMessage(newMsg).results.length)
  });

  it("responds correctly to status check command", function() {
    let strRover = new Rover(666)
    let newMsg = new Message("Test Message", [new Command('STATUS_CHECK', '')])
    expect(strRover.receiveMessage(newMsg).results).toContain(jasmine.objectContaining({
      roverStatus: {
        mode: strRover.mode,
        generatorWatts: strRover.generatorWatts,
        position: strRover.position
      }
    }));
  });

  it("responds correctly to mode change command", function() {
    let strRover = new Rover(666)
    let newMsgLowPower = new Message("Low_Power", [new Command('MODE_CHANGE', 'LOW_POWER')])
    expect(strRover.receiveMessage(newMsgLowPower).results[0].completed).toBeTrue()
    expect(strRover.mode).toEqual('LOW_POWER')
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let strRover = new Rover(666)
    strRover.mode = 'LOW_POWER'
    let newMsgMoveLowPower = new Message("Move", [new Command('MOVE', 777)])
    expect(strRover.receiveMessage(newMsgMoveLowPower).results[0].completed).toBeFalse()
  });

  it("responds with position for move command", function() {
    let strRover = new Rover(666)
    let newMsgMove = new Message("Move", [new Command('MOVE', 777)])
    strRover.receiveMessage(newMsgMove)
    expect(strRover.position).toEqual(newMsgMove.commands[0].value)
  });
});
