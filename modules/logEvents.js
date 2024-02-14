const fs = require("fs");
const fsPromises = require("fs").promises;

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// Luxon is my preferred package for handling timestamps
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const myEmitter = new MyEmitter();

myEmitter.on("ok", (msg) => {
  // Create a string consisting of a uuid, timestamp, the event type, and the event message
  let text =
    uuidv4() +
    "\t" +
    DateTime.now().toFormat("yyyy LLL dd hh:mm:ss") +
    "\tOK\t" +
    msg;

  if (EVENT_CONSOLE) console.log(text);
});

myEmitter.on("error", (msg) => {
  // Create a string consisting of a uuid, timestamp, the event type, and the event message
  let text =
    uuidv4() +
    "\t" +
    DateTime.now().toFormat("yyyy LLL dd hh:mm:ss") +
    "\tERROR\t" +
    msg;

  if (EVENT_CONSOLE) console.log(text);
});

// Export the Emitter so other modules can use it to emit() events
module.exports = myEmitter;
