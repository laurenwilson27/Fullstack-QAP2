const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// Luxon is my preferred package for handling timestamps
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const myEmitter = new MyEmitter();

// Function to write a line to a log file based on current date
const writeToDisk = async (line) => {
  const now = DateTime.now();

  // This file is within a subdirectory, but we want to create our file structure from the root - fortunately path.join allows ".." in the path
  const logFolder = path.join(__dirname, "..", "logs", now.year.toString());

  try {
    // Check if logs directory exists
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // If it doesn't, first create the logs directory
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    // Check if yearly logs directory exists
    if (!fs.existsSync(logFolder)) {
      // If it doesn't, first create the directory
      await fsPromises.mkdir(logFolder);
    }

    let fileName = now.toFormat("yyyyMMdd") + "_server_events.log";
    // Append to the file. The line passed in won't have a newline, so add one here
    await fsPromises.appendFile(path.join(logFolder, fileName), line + "\n");
  } catch (e) {
    console.log("Failed to write to log file: " + e);
  }
};

myEmitter.on("ok", async (msg) => {
  // Create a string consisting of a uuid, timestamp, the event type, and the event message
  let text =
    uuidv4() +
    "\t" +
    DateTime.now().toFormat("yyyy LLL dd hh:mm:ss") +
    "\tOK\t" +
    msg;

  if (EVENT_CONSOLE) console.log(text);
  if (EVENT_LOG) writeToDisk(text);
});

myEmitter.on("error", async (msg) => {
  // Create a string consisting of a uuid, timestamp, the event type, and the event message
  let text =
    uuidv4() +
    "\t" +
    DateTime.now().toFormat("yyyy LLL dd hh:mm:ss") +
    "\tERROR\t" +
    msg;

  if (EVENT_CONSOLE) console.log(text);
  if (EVENT_LOG) writeToDisk(text);
});

// Export the Emitter so other modules can use it to emit() events
module.exports = myEmitter;
